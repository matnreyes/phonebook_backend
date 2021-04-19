import React from 'react'

const Filter = ({value, filter}) => (
    <form>
        <div>Filter names: <input value={value} onChange={filter}/></div>
    </form> 
)

export default Filter