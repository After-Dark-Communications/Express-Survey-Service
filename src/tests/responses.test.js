const app = require("../app")
const mongoose = require("mongoose")
const supertest = require("supertest")
const Survey = require('../database/models/Survey')
const Response = require('../database/models/Response')

beforeEach((done) => {
  mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', (error) => console.error(error))
  db.once('open', () => done())
}, 30000)

test('GET /api/responses', async () => {
  const response = await Response.create({
    surveyTaker: 'johndoe',
    answers: [{
        question: {question: 'Survey question', type: 'text'},
        answer: 'Survey question answer'
    }]
  })
  await supertest(app).get('/api/responses')
    .expect(200)
    .then((res) => {
      // Check type and length
      expect(Array.isArray(res.body)).toBeTruthy()
      expect(res.body.length).toEqual(1)
      // Check data
      expect(res.body[0]._id).toBe(response._id.toString())
      expect(res.body[0].surveyTaker).toBe(response.surveyTaker)
      expect(res.body[0].answers[0]._id).toBe(response.answers[0]._id.toString())
    })
})

test('GET /api/responses/:response', async () => {
  const response = await Response.create({
    surveyTaker: 'johndoe',
    answers: [{
        question: {question: 'Survey question', type: 'text'},
        answer: 'Survey question answer'
    }]
  })
  await supertest(app).get(`/api/responses/${response._id}`)
    .expect(200)
    .then((res) => {
      // Check data
      expect(res.body._id).toBe(response._id.toString())
      expect(res.body.surveyTaker).toBe(response.surveyTaker)
      expect(res.body.answers[0]._id).toBe(response.answers[0]._id.toString())
    })
})

test('POST /api/responses/:survey', async () => {
  const survey = await new Survey({
    name: 'Survey 1',
    questions: [{
      question: 'Survey question 1',
      type: 'text'
    }]
  }).save()
  const data = {
    surveyTaker: 'johndoe',
    answers: [{
        question: survey.questions[0],
        answer: 'Survey question answer'
    }]
  }
  await supertest(app).post(`/api/responses/${survey._id}`)
    .send(data)
    .expect(201)
    .then(async (res) => {
      // Check the response
      expect(res.body._id).toBeTruthy()
      expect(res.body.surveyTaker).toBe(data.surveyTaker)
      expect(res.body.answers[0].answer).toBe(data.answers[0].answer)

      // Check data in the database
      const response = await Response.findById(res.body._id)
      expect(response).toBeTruthy()
      expect(response.surveyTaker).toBe(data.surveyTaker)
      expect(response.answers[0].answer).toBe(data.answers[0].answer)

      // Check survey data
      const updatedSurvey = await Survey.findById(survey._id)
      expect(updatedSurvey.responses[0]._id).toStrictEqual(response._id)
    })
})

test('DELETE /api/responses/:response', async () => {
  const response = await Response.create({
    surveyTaker: 'johndoe',
    answers: [{
        question: {question: 'Survey question', type: 'text'},
        answer: 'Survey question answer'
    }]
  })
  await supertest(app).delete(`/api/responses/${response._id}`)
    .expect(204)
    .then(async () => {
      // Check data in the database
      expect(await Response.findById(response._id)).toBeFalsy()
    })
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})