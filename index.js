const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('content', (req, res) => JSON.stringify(req.body))

app.use(corse())
app.use(express.json())
app.use(morgan(':method :url :status :req[content-length] :req[header] :total-time ms :content'))

let persons = [
    {
        id: 1,
        name: "Stella Adler",
        number: "555-553-1234"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "555-253-6534"
    },
    {
        id: 3,
        name: "Maria Hill",
        number: "555-234-4321"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
    response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).json({
            error: 'note does not exist with that id'
        })
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    let maxId = persons.length > 0 
        ? Math.floor(Math.random() * 1000)
        : 0
    

    while (persons.find(person => person.id === maxId))
    {
        maxId = Math.floor(Math.random() * 1000)
    }

    return maxId
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        response.status(400).json({
            error: 'Contact is missing a field'
        })
    }

    if (persons.find(person => person.name === body.name)) {
        response.status(400).json({
            error: 'Name must be unique'
        })
    }
    
    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)