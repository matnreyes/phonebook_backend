require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

morgan.token('content', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :req[content-length] :req[header] :total-time ms :content'))

// Failsafe if frontend fails
app.get('/', (request, response) => {
    response.send('<h1>Something went wrong loading site</h1>')
})

// Load contacts from server
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => { 
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
    response.send(info)
})

// Load specific page for contact (JSON)
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next)
})

// Upload a new contact to DB
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        response.status(400).json({
            error: 'Contact is missing a field'
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)