import React from 'react'

const Button = ({onClick, className='', children}) =>
    <button
        onClick={onClick}
        className={className}
        type="submit"
    >
        { children }
    </button>

export default Button
