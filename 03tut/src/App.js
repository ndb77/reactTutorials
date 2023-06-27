import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import { useState, useEffect } from "react";

import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState([]); //getter and setter = default
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        console.log(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.stack);
      } finally {
        setIsLoading(false);
      }
    };

    // setTimeout(() => {
    //   fetchItems();
    // }, 2000); // gives time to fetch items for load
  }, []); // runs on every render(last in line) or when the dependency list changes. [] = at load time only

  //CREATE -- POST
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; // if the items array has a length, get the id of the last element of the array and increment by one. Otherwise, set the id to 1
    const myNewItem = {
      id,
      checked: false,
      item,
    };
    const listItems = [...items, myNewItem]; // note -- a list, not an object
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL,postOptions)
    if (result) setFetchError(result)
  };


  // UPDATE -- PATCH 
  const handleCheck = async (id) => {
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

    const myItem = listItems.filter((item)=>item.id ===id)
    const updateOptions = {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    if (result) setFetchError(result)
  };

  //DELETE
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    // console.log(listItems)

    const deleteOptions = {method:'DELETE'}
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result) setFetchError(result)
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
      <SearchItem search={search} setSearch={setSearch} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
