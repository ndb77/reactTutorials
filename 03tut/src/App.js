import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import { useState } from "react";
function App() {
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

  const handleCheck = (id) => {
    const listItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
    // console.log(items.filter((item) => item.id===id)) // items list is filtered to log item selected by the item id
    // const selectedItem = items.filter(item => items.id===id)
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
    setItems(JSON.parse(localStorage.getItem("shoppinglist")));
    // console.log(listItems)
  };

  return (
    <div className="App">
      <Header title="Groceries List"></Header>
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
