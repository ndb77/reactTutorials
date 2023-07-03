import React from "react";
import { useEffect, useContext, useState } from "react";
import { format } from "date-fns";
import { useParams, Link, useHistory } from "react-router-dom";
import api from './api/posts'
import DataContext from "./context/DataContext";

const EditPost = () => {
  const { posts, setPosts } = useContext(DataContext);

  const { id } = useParams();

  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostBody, setEditPostBody] = useState("");

  const history = useHistory();
  // go through the list of posts and find the post that matches the id requested
  const post = posts.find((post) => post.id.toString() === id);

  // when the user wants to edit the post, the form will already be filled out using previously stored data from the posts array
  useEffect(() => {
    if (post) {
      setEditPostTitle(post.title);
      setEditPostBody(post.body);
    }
  }, [post, setEditPostTitle, setEditPostBody]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editPostTitle,
      datetime,
      body: editPostBody,
    };

    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      // map creates a new array
      // finds the post by id within the posts array state and passes in the new data to the state
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditPostTitle("");
      setEditPostBody("");
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      {editPostTitle && (
        <>
          <h1>Edit Post</h1>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editPostTitle}
              onChange={(e) => setEditPostTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editPostBody}
              onChange={(e) => setEditPostBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editPostTitle && (
        <>
          <h2>Page Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>{" "}
        </>
      )}
    </main>
  );
};

export default EditPost;
