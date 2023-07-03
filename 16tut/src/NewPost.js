import React from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import {useStoreState, useStoreActions} from 'easy-peasy'

const NewPost = () => {

  const posts = useStoreState((state)=>state.posts)
  const postTitle = useStoreState((state)=>state.postTitle)
  const postBody = useStoreState((state)=>state.postBody)

  const savePost = useStoreActions((actions)=> actions.savePost)
  const setPostTitle = useStoreActions((actions)=> actions.setPostTitle)
  const setPostBody = useStoreActions((actions)=> actions.setPostBody)

  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault();

    // get the id of the post -- if there is a length, get the id of the last post, if there are no posts, id =1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost)
    history.push('/')
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
