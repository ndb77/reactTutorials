import React from 'react'

const ColorBar = ({color, setColor}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Color"
        value={color}
        onChange={(e)=>setColor(e.target.value)}
      />
    </form>
  )
}

export default ColorBar