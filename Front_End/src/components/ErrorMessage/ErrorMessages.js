import React from 'react'

const ErrorMessages = (props) => {
    return (
        <div style={{color:"red"}}>
            {props.children}
        </div>
    )
}

export default ErrorMessages
