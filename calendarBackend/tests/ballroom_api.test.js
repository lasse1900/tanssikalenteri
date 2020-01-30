const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Ballroom = require('../models/ballroom')

describe('when there might be recods on the database', () => {
  beforeEach(async () => {
    await Ballroom.deleteMany({})

    const ballroomObjects = helper.initialBallrooms
      .map(ballroom => new Ballroom(ballroom))
    const promiseArray = ballroomObjects.map(ballroom => ballroom.save())
    await Promise.all(promiseArray)
  })

  test('ballrooms are returned as json', async () => {
    await api
      .get('/api/ballrooms')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('test valid id exists', () => {
    test('test that id is defined', async () => {
      const response = await api
        .get('/api/ballrooms')
      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('ballrooms are returned', () => {
    test('all ballrooms are returned', async () => {
      const response = await api.get('/api/ballrooms')

      expect(response.body.length).toBe(helper.initialBallrooms.length)
    })

    test('a specific ballroom is within the returned ballrooms', async () => {
      const response = await api.get('/api/ballrooms')

      const titles = response.body.map(r => r.title)
      expect(titles).toContain(
        'Pavi'
      )
    })
  })

  describe('viewing a specific ballroom', () => {
    test.skip('succeeds with a valid id', async () => {
      const ballroomsAtStart = await helper.ballroomsInDb()

      const ballroomToView = ballroomsAtStart[0]

      const resultBallroom = await api
        .get(`/api/ballrooms/${ballroomToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBallroom.body).toEqual(ballroomToView)
    })

    test.skip('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/ballrooms/${invalidId}`)
        .expect(400)
    })
  })

  describe('deletion of a ballroom', () => {
    test.skip('succeeds with status code 200 while id is valid', async () => {
      const ballroomsAtStart = await helper.ballroomsInDb()
      const ballroomToDelete = ballroomsAtStart[0]

      await api
        .delete(`/api/ballrooms/${ballroomToDelete.id}`)
        .expect(204)

      const ballroomsAtEnd = await helper.ballroomsInDb()

      expect(ballroomsAtEnd.length).toBe(
        helper.initialBallrooms.length - 1
      )

      const contents = ballroomsAtEnd.map(r => r.title)

      expect(contents).not.toContain(ballroomToDelete.title)
    })
  })

  describe('add a valid ballroom', () => {
    test.skip('a valid ballroom can be added ', async () => {
      const newBallroom = {
        title: 'Tanhuhovi',
        author: 'Simo',
        url: 'http://tanhuhovi.fi',
      }

      await api
        .post('/api/ballrooms')
        .send(newBallroom)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const ballroomsAtEnd = await helper.ballroomsInDb()
      const response = await api.get('/api/ballrooms')
      const contents = ballroomsAtEnd.map(n => n.title)

      expect(ballroomsAtEnd.length).toBe(helper.initialBallrooms.length + 1)
      expect(contents).toContain('Tanhuhovi')
    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})