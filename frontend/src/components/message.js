import React from 'react'

const Message = ({message}) => {
    // Style for Message conmponent
    const messageStyle = {
        background: 'lightgrey',
        fontSize: 20,
        fontStyle: 'bold',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }
    message.isError ? messageStyle.color = 'red' : messageStyle.color = 'green'

    return (
        <div style={messageStyle}>
            {message.content}
        </div>
    )
}

export default Message