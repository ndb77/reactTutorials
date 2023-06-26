import React from 'react'

const Footer = ({length}) => {
  const today = new Date();

  return (
    <footer>
      <p>
        {length} List {length===1?"items":"items"}
      </p>
    </footer>
  )
}

export default Footer