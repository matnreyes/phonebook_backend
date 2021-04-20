const mongoose = require('mongoose')

const password = process.argv[2]
const contactName = process.argv[3]
const contactNumber = process.argv[4]

const url =
    `mongodb+srv://phonebook_api:${password}@cluster0.f7bfa.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({})
    .then(persons=> {
        persons.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
        process.exit()
    })
}

const person = new Person({
    name: contactName,
    number: contactNumber
})

person.save().then(result => {
    console.log(`Added ${contactName} number ${contactNumber} to phonebook`)
    mongoose.connection.close()
})
