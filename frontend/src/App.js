import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Message from './components/message'
import Persons from './components/persons'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ searchResult, setSearchResult ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ message, setMessage ] = useState(null)

  // Load person data from server 
  useEffect( () => {
    contactService
      .getContacts()
      .then(contacts => {
        setPersons(contacts)
        setSearchResult(contacts)
      })
  }, [])
  
  // Adds new contact onto server
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    // Update users that are in phonebook already if name entered
    const match = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())
    if (match) {
      const update = window.confirm(`${match.name} already in phonebook. Would you like to update their number?`)
      if (update) {
        nameObject.id = match.id
        contactService
          .updateContact(nameObject)
          .then(updatedContacts => {
            const notifObject = {
              content: `${newName} has been updated`,
              isError: false
            }
            setMessage(notifObject)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setPersons(updatedContacts)
            setSearchResult(updatedContacts)
          })
          .catch(error => {
            const notifObject = {
              content: `${newName} does not exist in phonebook anymore`,
              isError: true
            }
            setMessage(notifObject)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
        setNewNumber('')
        setNewName('')
      }
      return
    }
    
    contactService
      .addContacts(nameObject)
      .then(newContact => {
        const notifObject = {
          content: `${newName} added to phonebook`,
          isError: false
        }
        setMessage(notifObject)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
        setPersons(persons.concat(newContact))
        setSearchResult(persons.concat(newContact))
      })
    setNewName('')
    setNewNumber('')
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput  = (event) => {
    setNewNumber(event.target.value)
  }
  
  // Deletes contacts
  const handleDelete = (event) => {
    const contact = persons.find(person => person.id === parseInt(event.target.value))
    const userChoice = window.confirm(`Are you sure you want to delete ${contact.name}?`)
    if (!userChoice) {
      return
    }

    contactService.deleteContact(contact.id).then(updatedContacts => {
      const notifObject = {
        content: `${contact.name} has been deleted`,
        isError: false
      }
      setMessage(notifObject)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
      setSearchResult(updatedContacts)
      setPersons(updatedContacts)
    })
    .catch(error => {
      const notifObject = {
        content: `${contact.name} is already deleted`,
        isError: true
      }
      setMessage(notifObject)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
      setSearchResult(persons.filter(person => person.id !== contact.id))
      setPersons(persons.filter(person => person.id !== contact.id))
    })
  }

  const searchNames = (event) => {
    const value = event.target.value
    setNewSearch(value)
    setSearchResult(persons.filter(person => person.name.toUpperCase().includes(value.toUpperCase())))
  }

  return (
    <div>
      <Message message={message} />
      <h2>Phonebook</h2>
      <Filter value={newSearch} filter={searchNames} />
      <h2>add a new</h2>
      <PersonForm submit={addName} nameValue={newName} nameInput={handleNameInput} 
        numberValue={newNumber} numberInput={handleNumberInput} />
      <h2>Numbers</h2>
      <Persons numbers={searchResult} handleDelete={handleDelete} />
    </div>
  )
}

export default App
