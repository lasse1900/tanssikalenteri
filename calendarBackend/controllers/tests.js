const router = require('express').Router()
const Ballroom = require('../models/ballroom')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Ballroom.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router