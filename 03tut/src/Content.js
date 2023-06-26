import React from "react";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
const Content = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "One half pound bag of coca covered almonds unsalted",
    },
    {
      id: 2,
      checked: false,
      item: "Item 2",
    },
    {
      id: 3,
      checked: false,
      item: "Item 3",
    },
  ]); //getter and setter = default

  const handleCheck = (id) =>{
    const listItems = items.map((item)=>{
      if(item.id===id){
        return({...item,checked:!item.checked})
      }
      else{
        return item
      }
    })
    setItems(listItems)
    localStorage.setItem('shoppinglist',JSON.stringify(listItems));
    // console.log(items.filter((item) => item.id===id)) // items list is filtered to log item selected by the item id
    // const selectedItem = items.filter(item => items.id===id)

  }

  const handleDelete = (id) =>{
    const listItems = items.filter((item)=>item.id!==id)
    localStorage.setItem('shoppinglist',JSON.stringify(listItems))
    setItems(JSON.parse(localStorage.getItem('shoppinglist')))
    // console.log(listItems)
  }

  return (
    <main>
      {items.length?(
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input type="checkbox" checked={item.checked} onChange={()=>handleCheck(item.id)}/>
              <label
                style={(item.checked)?{textDecoration:'line-through'}:null}
                onDoubleClick={()=>handleCheck(item.id)}
              >{item.item}</label>
              <FaTrashAlt onClick={()=>handleDelete(item.id)} role="button" tabIndex="0" />
            </li>
          ))}
        </ul>
      ):(
        <p style={{marginTop:'2rem'}}> Your List Is Empty </p>
      )}
    </main>
  );
};

export default Content;
