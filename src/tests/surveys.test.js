const app = require("../app")
const mongoose = require("mongoose")
const supertest = require("supertest")
const Survey = require('../database/models/Survey')

beforeEach((done) => {
  mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', (error) => console.error(error))
  db.once('open', () => done())
})

test('GET /api/surveys', async () => {
  const survey = await Survey.create({
    name: 'Survey 1',
    questions: [{
      question: 'Survey question 1',
      type: 'text'
    }]
  })
  await supertest(app).get('/api/surveys')
    .expect(200)
    .then((res) => {
      // Check type and length
      expect(Array.isArray(res.body)).toBeTruthy()
      expect(res.body.length).toEqual(1)

      // Check data
      expect(res.body[0]._id).toBe(survey._id.toString())
      expect(res.body[0].name).toBe(survey.name)
      expect(res.body[0].questions[0]._id).toBe(survey.questions[0]._id.toString())
    })
})

test('GET /api/surveys/:survey', async () => {
  const survey = await Survey.create({
    name: 'Survey 1',
    questions: [{
      question: 'Survey question 1',
      type: 'text'
    }]
  })
  await supertest(app).get(`/api/surveys/${survey._id}`)
    .expect(200)
    .then((res) => {
      // Check data
      expect(res.body._id).toBe(survey._id.toString())
      expect(res.body.name).toBe(survey.name)
      expect(res.body.questions[0]._id).toBe(survey.questions[0]._id.toString())
    })
})

test('POST /api/surveys', async () => {
  const data = {
    name: 'Survey 1',
    questions: [{
      question: 'Survey question 1',
      type: 'text'
    }]
  }
  await supertest(app).post('/api/surveys')
    .send(data)
    .expect(201)
    .then(async (res) => {
      // Check the response
      expect(res.body._id).toBeTruthy()
      expect(res.body.name).toBe(data.name)
      expect(res.body.questions[0].question).toBe(data.questions[0].question)

      // Check data in the database
      const survey = await Survey.findById(res.body._id)
      expect(survey).toBeTruthy()
      expect(survey.name).toBe(data.name)
      expect(survey.questions[0].question).toBe(data.questions[0].question)
    })
})

test('PATCH /api/surveys/:survey', async () => {
  const survey = await Survey.create({
    name: 'Survey 1',
    questions: [{
      question: 'Survey question 1',
      type: 'text'
    }]
  })
  const data = {name: 'Survey 1 UPDATED'}
  await supertest(app).patch(`/api/surveys/${survey._id}`)
    .send(data)
    .expect(200)
    .then(async (res) => {
      // Check the response
      expect(res.body._id).toBe(survey._id.toString())
      expect(res.body.name).toBe(data.name)

      // Check data in the database
      const updatedSurvey = await Survey.findById(res.body._id)
      expect(updatedSurvey).toBeTruthy()
      expect(updatedSurvey.name).toBe(data.name)
    })
})

test('DELETE /api/surveys/:survey', async () => {
  const survey = await Survey.create({
    name: 'Survey 1',
    questions: [{
      question: 'Survey question 1',
      type: 'text'
    }]
  })
  await supertest(app).delete(`/api/surveys/${survey._id}`)
    .expect(204)
    .then(async () => {
      // Check data in the database
      expect(await Survey.findById(survey._id)).toBeFalsy()
    })
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})