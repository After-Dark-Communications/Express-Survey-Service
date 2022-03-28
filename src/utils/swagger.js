const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['src/routes/index.js']

const setup = {
    info: {
        version: "1.0.0",
        title: "Survey service API",
        description: "Endpoint documentation for the ExpressJS API."
    },
    host: "localhost:3000",
    basePath: "/api",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Survey",
            "description": "Endpoints"
        },
        {
            "name": "Response",
            "description": "Endpoints"
        }
    ],
    definitions: {
        Survey: {
            _id: "123456",
            name: "Dinner in Motion survey",
            type: "survey",
            questions: [
                {
                    _id: "123456",
                    question: "How would you rate your experience?",
                    type: "text-input",
                    isRequired: "true"
                }
            ],
            created: "2022-03-22T00:00:00.000Z"
        },
        AddSurvey: {
            $name: "Dinner in Motion survey",
            $type: "survey",
            questions: [
                {
                    question: "How would you rate your experience?",
                    type: "text-input",
                    isRequired: "true"
                }
            ]
        },
        Response: {
            _id: "123456",
            survey: "123456",
            surveyTaker: "John Doe",
            answers: [
                {
                    _id: "123456",
                    question: "123456",
                    answer: "8/10"
                }
            ],
            created: "2022-03-22T00:00:00.000Z"
        },
        AddResponse: {
            $survey: "123456",
            $surveyTaker: "John Doe",
            answers: [
                {
                    question: "123456",
                    answer: "8/10"
                }
            ]
        },
    }
}

swaggerAutogen(outputFile, endpointsFiles, setup)