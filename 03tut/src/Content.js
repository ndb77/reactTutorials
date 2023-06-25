import React from "react";

const Content = () => {
  const handleNameChange = () => {
    const names = ["noah", "boa", "hoa"];
    const int = Math.floor(Math.random() * 3);
    return names[int];
  };

  const handleClick = () => {
    console.log("Clicked!");
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
      <p>Hello {handleNameChange()}</p>
      <button onClick={handleClick}> Click this</button>
      <button onClick={()=>handleClick2(handleNameChange())}> Click this</button>
      
      {/* Event object is passed and output by handleClick3 */}
      <button onClick={(e)=>handleClick3(e)}> Click this</button>

    </main>
  );
};

export default Content;
