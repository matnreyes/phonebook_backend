import axios from 'axios'
const url = 'http://localhost:3001/api/persons'

const getContacts = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addContacts = contactObject => {
    const request = axios.post(url, contactObject)
    return request.then(response => response.data)
}

const deleteContact = contactID => {
    const request = axios.delete(`${url}/${contactID}`)
    return request.then(response => getContacts())
}

const updateContact = contactObject => {
    const request = axios.put(`${url}/${contactObject.id}`, contactObject)
    return request.then(reponse => getContacts())
}

const contactService = { getContacts, addContacts, deleteContact, updateContact }

export default contactService