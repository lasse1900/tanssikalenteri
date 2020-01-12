const jwt = require('jsonwebtoken')
const ballroomsRouter = require('express').Router()
const Ballroom = require('../models/ballroom2')
const User = require('../models/user')

ballroomsRouter.get('/', async (request, response) => {
  const ballrooms = await Ballroom
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(ballrooms.map(ballroom => ballroom.toJSON()))
})

ballroomsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const ballroom = new Ballroom({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user.id
    })

    const savedBallroom = await ballroom.save()
    const populatedBallroom = await Ballroom.findById(savedBallroom._id).populate('user', { username: 1, name: 1, id: 1 })
    user.ballrooms = user.ballrooms.concat(savedBallroom._id)
    await user.save()
    response.status(201).json(populatedBallroom)
  } catch (exception) {
    next(exception)
  }
})


module.exports = ballroomsRouter