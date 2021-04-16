const express = require('express')
const app = express()

app.use(express.json())

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


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)