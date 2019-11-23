const jwt = require('jsonwebtoken')
const ballroomsRouter = require('express').Router()
const Ballroom = require('../models/ballroom')
const User = require('../models/user')

ballroomsRouter.get('/', async (request, response) => {
  const ballrooms = await Ballroom
    .find({}).populate('user', { username: 1, name: 1 })

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

    if (!body.title || !body.url) {
      response.status(400).send({ error: 'title and url required' })
    } else {
      const ballroom = new Ballroom({
        author: body.author,
        title: body.title,
        url: body.url,
        user: user._id,
      })
      const result = await ballroom.save()
      user.ballrooms = user.ballrooms.concat(result._id)
      await user.save()
      response.status(201).json(result)
    }
  } catch (error) {
    next(error)
  }
})

ballroomsRouter.put('/:id', async (request, response) => {
  const { author, title, url } = request.body

  const ballroom = {
    author, title, url
  }

  const result = await Ballroom.findByIdAndUpdate(request.params.id, ballroom, { new: true })
  response.status(200).json(result)
})

module.exports = ballroomsRouter