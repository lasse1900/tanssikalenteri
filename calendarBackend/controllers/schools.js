const jwt = require('jsonwebtoken')
const schoolsRouter = require('express').Router()
const School = require('../models/school')
const User = require('../models/user')

schoolsRouter.get('/', async (request, response) => {
  const ballrooms = await School
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(ballrooms.map(school => school.toJSON()))
})

schoolsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const school = new School({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user.id
    })

    const savedBallroom = await school.save()
    const populatedBallroom = await School.findById(savedBallroom._id).populate('user', { username: 1, name: 1, id: 1 })
    user.ballrooms = user.ballrooms.concat(savedBallroom._id)
    await user.save()
    response.status(201).json(populatedBallroom)
  } catch (exception) {
    next(exception)
  }
})


module.exports = schoolsRouter