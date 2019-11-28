const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('../tests/test_helper')

const User = require('../models/user')

describe('when there is initially one user at db', () => {

  test('Login with new user count', async () => {
    const response = await api
      .post('/login')
      .send({ username: 'lasse', password: 'secret' })
    token = `Bearer {$2b$10$mw.wY64cznvI/TBq3yMW.OtKOZ3nC.S4IlATx5zsgTavgwN138BBm}`
    console.log('token', token)
  })

  test('A Ballroom can be added', async () => {
    const newBallroom = {
      title: 'Tanhuhovi',
      author: 'root',
      url: 'http://tanhuhovi.fi',
    }

    const response = await api
      .post('/api/ballrooms')
      .send(newBallroom)
      .set({ Authorization: token })
      .expect(201)
      // .expect('Content-Type', /application\/json/)

      const ballroomsAtEnd = await helper.blogsInDb()
      const response = await api.get('/api/ballrooms')
      const contents = ballroomsAtEnd.map(n => n.title)
      console.log('---------- > contents', contents)
  
      expect(ballroomsAtEnd.length).toBe(helper.initialBallrooms.length + 1)
      expect(contents).toContain('Tanhuhovi')
  })
  
})

afterAll(() => {
  mongoose.connection.close()
})