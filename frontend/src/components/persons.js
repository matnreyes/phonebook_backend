import React from 'react'

const Persons = ({numbers, handleDelete }) => (
    <ul> {numbers.map(person => (
    <li key={person.id}>{person.name} {person.number}      
    <button value={person.id} onClick={handleDelete}>delete</button></li>
    ))}
    </ul>

)

export default Persons