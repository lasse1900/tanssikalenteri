const Ballroom = require('../models/ballroom')
const User = require('../models/user')

const initialBallrooms = [
  {
    title: 'Pavi',
    author: 'Simo',
    url: 'http://pavi.fi/',
  },
  {
    title: 'Ruusulinna',
    author: 'Asko',
    url: 'http://ruusulinna.net',
  },
]

beforeEach(async () => {
  await Ballroom.deleteOne({})

  let ballroomObject = new Ballroom(initialBallrooms[0])
  await ballroomObject.save()

  ballroomObject = new Ballroom(initialBallrooms[1])
  await ballroomObject.save()
})

const nonExistingId = async () => {
  const ballroom = new Ballroom()
  await ballroom.save()
  await ballroom.deleteOne()
  // await ballroom.remove()

  return ballroom._id.toString()
}

const ballroomsInDb = async () => {
  const ballrooms = await Ballroom.find({})
  // console.log('----->>>  ballromms', ballrooms.length)
  return ballrooms.map(ballroom => ballroom.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { ballroomsInDb, nonExistingId, initialBallrooms, usersInDb }