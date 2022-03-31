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
            description: "Dinner in Motion survey description",
            visibility: "private",
            questions: [
                {
                    _id: "123456",
                    question: "How would you rate your experience?",
                    type: "text",
                    options: [],
                    required: true
                }
            ],
            responses: [],
            created: "2022-01-01T00:00:00.000Z",
            updated: "2022-01-01T00:00:00.000Z"
        },
        AddSurvey: {
            $name: "Dinner in Motion survey",
            $description: "Dinner in Motion survey description",
            visibility: "public",
            $questions: [
                {
                    $question: "How would you rate your experience?",
                    $type: "text",
                    options: [],
                    $required: false
                }
            ]
        },
        Response: {
            _id: "123456",
            surveyTaker: "John Doe",
            answers: [
                {
                    _id: "123456",
                    "answer": "I rate it 10 out of 10",
                    "question": {
                        _id: "123456",
                        $question: "How would you rate your experience?",
                        $type: "text",
                        options: [],
                        $required: true
                    }
                }
            ],
            created: "2022-03-22T00:00:00.000Z"
        },
        AddResponse: {
            $surveyTaker: "John Doe",
            answers: [
                {
                    "answer": "I rate it 10 out of 10",
                    "question": {
                        $question: "How would you rate your experience?",
                        $type: "text",
                        options: [],
                        $required: true
                    }
                }
            ]
        },
    }
}

swaggerAutogen(outputFile, endpointsFiles, setup)