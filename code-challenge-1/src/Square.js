import React from 'react'

const Square = ({color}) => {
  return (
    <div className='square' style={{backgroundColor:`${color}`}}>
      <p>Empty Value</p>
    </div>
  )
}

export default Square