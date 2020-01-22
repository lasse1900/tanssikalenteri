const jwt = require('jsonwebtoken')
const ballroomsRouter = require('express').Router()
const Ballroom = require('../models/ballroom')
const User = require('../models/user')
const Comment = require('../models/ballroomComment')

ballroomsRouter.get('/', async (request, response) => {
  const ballrooms = await Ballroom
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(ballrooms.map(ballroom => ballroom.toJSON()))
})

ballroomsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      const ballroomRemoved = await Ballroom.findById(request.params.id)
      if (ballroomRemoved.user.toString() === decodedToken.id.toString()) {
        const result = await Ballroom.findByIdAndRemove(request.params.id)
        response.status(204).json(result)
      } else {
        response.status(400).send({ error: 'allowed only to remove own ballrooms' })
      }
    }
  } catch (exception) {
    next(exception)
  }
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

ballroomsRouter.post('/:id/comments', async (request, response) => {
  const ballroom = await Ballroom.findById(request.params.id)

  if (!ballroom) {
    return response.status(400).send({ error: 'no ballroom on that id' }).end()
  }

  const comment = new Comment(request.body)
  comment.ballroom = ballroom._id

  const savedComment = await comment.save()
  ballroom.comments = ballroom.comments.concat(savedComment._id)
  await ballroom.save()

  response.status(201).json(savedComment.toJSON())
})

module.exports = ballroomsRouter