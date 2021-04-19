import React from 'react'

const PersonForm = ({ submit, nameValue, nameInput, numberValue, numberInput }) => (
    <form onSubmit={submit}>
        <div>name: <input value={nameValue} onChange={nameInput}/></div>
        <div>number: <input value={numberValue} onChange={numberInput}/></div>
        <div> <button id='submit' type="submit">add</button></div>
    </form>
)

export default PersonForm