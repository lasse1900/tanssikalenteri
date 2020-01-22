const jwt = require('jsonwebtoken')
const schoolsRouter = require('express').Router()
const School = require('../models/school')
const User = require('../models/user')
const Comment = require('../models/schoolComment')

schoolsRouter.get('/', async (request, response) => {
  const schools = await School
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(schools.map(school => school.toJSON()))
})

schoolsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      const schoolRemoved = await School.findById(request.params.id)
      if (schoolRemoved.user.toString() === decodedToken.id.toString()) {
        const result = await School.findByIdAndRemove(request.params.id)
        response.status(204).json(result)
      } else {
        response.status(400).send({ error: 'allowed only to remove own schools' })
      }
    }
  } catch (exception) {
    next(exception)
  }
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
      user: user.id
    })

    const savedSchool = await school.save()
    const populatedSchool = await School.findById(savedSchool._id).populate('user', { username: 1, name: 1, id: 1 })
    user.schools = user.schools.concat(savedSchool._id)
    await user.save()
    response.status(201).json(populatedSchool)
  } catch (exception) {
    next(exception)
  }
})

schoolsRouter.post('/:id/comments', async (request, response) => {
  const school = await School.findById(request.params.id)

  if (!school) {
    return response.status(400).send({ error: 'no danceschool on that id' }).end()
  }

  const comment = new Comment(request.body)
  comment.school = school._id

  const savedComment = await comment.save()
  school.comments = school.comments.concat(savedComment._id)
  await school.save()

  response.status(201).json(savedComment.toJSON())
})

module.exports = schoolsRouter