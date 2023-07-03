import React from "react";

import { useContext, useState } from "react";
import {useHistory} from 'react-router-dom'
import { format } from "date-fns";

import DataContext from "./context/DataContext";
import api from './api/posts'

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  
  const {posts,setPosts } = useContext(DataContext)

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // get the id of the post -- if there is a length, get the id of the last post, if there are no posts, id =1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    // const allPosts = [...posts, newPost];

    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h1>NewPost</h1>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e)=>setPostTitle(e.target.value)}/>
          <label htmlFor="postBody">Post:</label>
          <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e)=> setPostBody(e.target.value)}/>
          <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
