const jwt = require('jsonwebtoken')
const videoRouter = require('express').Router()
const Video = require('../models/video')
const User = require('../models/user')
const Comment = require('../models/videoComment')

videoRouter.get('/', async (request, response) => {
  const videos = await Video
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(videos.map(video => video.toJSON()))
})

videoRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      const videoRemoved = await Video.findById(request.params.id)
      if (videoRemoved.user.toString() === decodedToken.id.toString()) {
        const result = await Video.findByIdAndRemove(request.params.id)
        response.status(204).json(result)
      } else {
        response.status(400).send({ error: 'allowed only to remove own videos' })
      }
    }
  } catch (exception) {
    next(exception)
  }
})

videoRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const video = new Video({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id
    })

    const savedVideo = await video.save()
    const populatedVideo = await Video.findById(savedVideo._id).populate('user', { username: 1, name: 1, id: 1 })
    user.videos = user.videos.concat(savedVideo._id)
    await user.save()
    response.status(201).json(populatedVideo)
  } catch (exception) {
    next(exception)
  }
})

videoRouter.post('/:id/comments', async (request, response) => {
  const video = await Video.findById(request.params.id)

  if (!video) {
    return response.status(400).send({ error: 'no videos on that id' }).end()
  }

  const comment = new Comment(request.body)
  comment.video = video._id

  const savedComment = await comment.save()
  video.comments = video.comments.concat(savedComment._id)
  await video.save()

  response.status(201).json(savedComment.toJSON())
})

module.exports = videoRouter