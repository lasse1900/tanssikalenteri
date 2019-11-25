const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('ballrooms are returned', () => {
  test('ballrooms are returned as json', async () => {
    await api
      .get('/api/ballrooms')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('test valid id exists', () => {
  test('test that id is defined', async () => {
    const response = await api
      .get('/api/ballrooms')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('get all ballrooms', () => {
  test('all ballrooms are returned', async () => {
    const response = await api
      .get('/api/ballrooms')
    expect(response.body.length).toBe(2)
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
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const ballroomsAtEnd = await helper.ballroomsInDb()
    const response = await api.get('/api/ballrooms')
    const contents = ballroomsAtEnd.map(n => n.title)

    expect(ballroomsAtEnd.length).toBe(helper.initialBallrooms.length + 1)
    expect(contents).toContain('tanhuhovi')
  })
})



describe('try to edit ballrooms table', () => {
    test.skip('ballroom without title & content not added', async () => {
      const newBallroom = {
        author: 'Robert Jr',
        likes: 10,
      }

      await api
        .post('/api/ballroomss')
        .send(newBallroom)
        .expect(400)

      const ballroomsAtEnd = await helper.ballroomsInDb()
      expect(ballroomsAtEnd.length).toBe(helper.initialBallrooms.length)
    })

  describe('try to delete a ballroom', () => {
    test.skip('a ballroom can be deleted', async () => {
      const ballroomsAtStart = await helper.ballroomsInDb()
      const ballroomToDelete = ballroomsAtStart[0]
      console.log('ballroomToDelete', ballroomToDelete.id)

      await api
        .delete(`/api/ballrooms/${ballroomToDelete.id}`)
        .expect(204)

      const ballroomsAtEnd = await helper.ballroomsInDb()

      expect(ballroomsAtEnd.length).toBe(
        helper.initialBallrooms.length - 1
      )

      const titles = ballroomsAtEnd.map(r => r.title)
      expect(titles).not.toContain(ballroomToDelete.title)
    })
  })

  describe('use PUT to edit likes of a ballroom ', () => {
    test.skip('amount of likes is updated', async () => {
      const ballroomsAtStart = await helper.ballroomsInDb()
      const ballroomToUpdate = ballroomsAtStart[0]

      const updateBallroom = {
        likes: ballroomToUpdate.likes + 1
      }

      await api.put(`/api/ballrooms/${ballroomToUpdate.id}`).send(updateBallroom)
      updateBallroom = await Ballroom.findById(ballroomToUpdate.id)
      expect(updatedBallroom.likes).toBe(ballroomToUpdate.likes + 1)
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})