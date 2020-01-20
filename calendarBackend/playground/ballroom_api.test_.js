const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Ballroom = require('../models/ballroom')
const helper = require('./test_helper')

describe('ballrooms are returned', () => {
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
    expect(response.body.length).toBe(helper.initialBallrooms.length)
  })
})

test('a specific ballroom is within the returned ballrooms', async () => {
  const response = await api.get('/api/ballrooms')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'Pavi'
  )
})

describe('all ballrooms are returned', () => {
  test('all ballrooms are returned', async () => {
    const response = await api.get('/api/ballrooms')

    expect(response.body.length).toBe(helper.initialBallrooms.length)
  })
})

describe('viewing a specific ballroom', () => {

  test('succeeds with a valid id', async () => {
    const ballroomsAtStart = await helper.ballroomsInDb()

    const ballroomToView = ballroomsAtStart[0]
    console.log('------>>>>>', ballroomToView)

    const resultBallroom = await api
      .get(`/api/ballrooms/${ballroomToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBallroom.body).toEqual(ballroomToView)
  })
})


describe('addition of a new ballroom', () => {
  test.skip('succeeds with valid data', async () => {
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
    expect(ballroomsAtEnd.length).toBe(helper.initialBallrooms.length + 1)

    const titles = ballroomsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Tanhuhovi'
    )
  })

})

describe('deletion of a ballroom', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const ballroomsAtStart = await helper.ballroomsInDb()
    const ballroomToDelete = ballroomsAtStart[0]
    console.log('---- delete -->>>>>', ballroomToDelete)

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
  test('a valid ballroom can be added ', async () => {
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
      author: 'Robert Jr'
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

  describe('test database wipe of ballrooms', () => {
    test('delete ballrooms', async () => {
      await Ballroom.deleteMany({})
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})