import React from "react";
import {useState} from 'react';
const Content = () => {

  const [name,setName] = useState('noah')//getter and setter = default
  const [count,setCount] = useState(0)
  const handleNameChange = () => {
    const names = ["noah", "boa", "hoa"];
    const int = Math.floor(Math.random() * 3);
    return setName(names[int]);
  };

  const handleClick = () => {
    console.log(count);
  };

  const handleClick2 = (name) => {
    console.log(`${name} "Clicked!`);
  };

  const handleClick3 = (e) => {
    // console.log(e.target.childNodes[0].data);
    console.log(e.target.innerText);

  };

  return (
    <main>
      <p>Hello {name}</p>
      <button onClick={handleNameChange}>Name Change</button>
      <button onClick={handleClick}> Change Name</button>
      
      {/* Event object is passed and output by handleClick3 */}
      <button onClick={(e)=>handleClick3(e)}> Click this</button>

    </main>
  );
};

export default Content;
