import Content from "./Content";

import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [selection, setSelection] = useState("/users");
  const [selectedButton, setSelectedButton] = useState("users");
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "https://jsonplaceholder.typicode.com";

  useEffect(() => {
    const fetchItems = async (selectionAPI) => {
      try {
        const response = await fetch(API_URL + selectionAPI);
        if (!response.ok) throw Error("did not receive expected data");
        const listItems = await response.json();
        setData(listItems);
        console.log(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.stack);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    console.log(selection);
    fetchItems(selection);
    // setTimeout(() => {
    //   fetchItems();
    // }, 2000); // gives time to fetch items for load
  }, [selectedButton]); // runs on every render(last in line) or when the dependency list changes. [] = at load time only

  const handleUsersButton = (e) => {
    e.preventDefault();
    setSelection("/users");
    setSelectedButton("users");
    console.log(selection);
  };
  const handlePostsButton = (e) => {
    e.preventDefault();
    setSelection("/posts");
    setSelectedButton("posts");
    console.log(selection);
  };

  const handleCommentsButton = (e) => {
    e.preventDefault();
    setSelection("/comments");
    setSelectedButton("comments");
  };

  return (
    <div className="App">
      <form>
        <button
          onClick={handleUsersButton}
          className={selectedButton === "users" ? "selected" : "not-selected"}
        >
          Users
        </button>
        <button
          onClick={handlePostsButton}
          className={selectedButton === "posts" ? "selected" : "not-selected"}
        >
          Posts
        </button>
        <button
          onClick={handleCommentsButton}
          className={
            selectedButton === "comments" ? "selected" : "not-selected"
          }
        >
          Comments
        </button>
      </form>
      <Content data={data} fetchError={fetchError} />
    </div>
  );
}

export default App;
