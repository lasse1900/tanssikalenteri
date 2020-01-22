const jwt = require('jsonwebtoken')
const calendarRouter = require('express').Router()
const Calendar = require('../models/calendar')
const User = require('../models/user')
const Comment = require('../models/calendarComment')

calendarRouter.get('/', async (request, response) => {
  const calendars = await Calendar
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(calendars.map(calendar => calendar.toJSON()))
})

calendarRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      const calendarRemoved = await Calendar.findById(request.params.id)
      if (calendarRemoved.user.toString() === decodedToken.id.toString()) {
        const result = await Calendar.findByIdAndRemove(request.params.id)
        response.status(204).json(result)
      } else {
        response.status(400).send({ error: 'allowed only to remove own calendars' })
      }
    }
  } catch (exception) {
    next(exception)
  }
})

calendarRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const calendar = new Calendar({
      title: body.title,
      author: body.author,
      url: body.url,
      date: body.date,
      user: user.id
    })

    const savedCalendar = await calendar.save()
    const populatedCalendar = await Calendar.findById(savedCalendar._id).populate('user', { username: 1, name: 1, id: 1 })
    user.calendars = user.calendars.concat(savedCalendar._id)
    await user.save()
    response.status(201).json(populatedCalendar)
  } catch (exception) {
    next(exception)
  }
})

calendarRouter.post('/:id/comments', async (request, response) => {
  const calendar = await Calendar.findById(request.params.id)

  if (!calendar) {
    return response.status(400).send({ error: 'no calendars on that id' }).end()
  }

  const comment = new Comment(request.body)
  comment.calendar = calendar._id

  const savedComment = await comment.save()
  calendar.comments = calendar.comments.concat(savedComment._id)
  await calendar.save()

  response.status(201).json(savedComment.toJSON())
})

module.exports = calendarRouter