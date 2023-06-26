import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import { useState,useEffect } from "react";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist")) || []
  ); //getter and setter = default

  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  useEffect(()=>{
    localStorage.setItem("shoppinglist", JSON.stringify(items)); // saving the current state of items
  },[items]) // runs on every render(last in line) or when the dependency list changes. [] = at load time only

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; // if the items array has a length, get the id of the last element of the array and increment by one. Otherwise, set the id to 1
    const myNewItem = {
      id,
      checked: false,
      item,
    };
    const listItems = [...items, myNewItem]; // note -- a list, not an object
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
    setItems(listItems);
    // console.log(items.filter((item) => item.id===id)) // items list is filtered to log item selected by the item id
    // const selectedItem = items.filter(item => items.id===id)
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    // console.log(listItems)
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload upon submit
    if (!newItem) return; // if the submission is blank, don't do anything
    addItem(newItem);
    setNewItem("");
    console.log("submitted", newItem);
  };

  return (
    <div className="App">
      <Header title="Groceries List"></Header>
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Content
        items={items.filter(item=>((item.item).toLowerCase().includes(search.toLowerCase())))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
