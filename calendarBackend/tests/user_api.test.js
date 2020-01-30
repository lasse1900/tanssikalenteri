const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('../tests/test_helper')

const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', name:'Root', password: 'sekret' })
    await user.save()
  })

  test('creation fails as status 400 - only one root', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      'username': 'root',
      'name': 'root',
      'password': 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation succeeds as status 200 - created another user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      'username': 'lasse',
      'name': 'lasse',
      'password': 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  })


  test('creation fails at status 400 if password < 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      'username': 'tomi',
      'name': 'Tomi',
      'password': 'se'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'simo',
      name: 'Simo',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Login with new user count', async () => {
    const response = await api
      .post('/login')
      .send({ username: 'simo', password: 'secret' })
    token = `Bearer ${response.body.token}`
    // console.log('------------> token', response.body)
  })

})

afterAll(() => {
  mongoose.connection.close()
})