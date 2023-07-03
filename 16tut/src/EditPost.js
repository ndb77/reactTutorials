import React from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { useParams, Link, useHistory } from "react-router-dom";
import {useStoreState, useStoreActions} from 'easy-peasy'

const EditPost = () => {

  const { id } = useParams();

  const editPostTitle = useStoreState((state)=>state.editPostTitle)
  const editPostBody = useStoreState((state)=>state.editPostBody)

  const editPost = useStoreActions((actions)=> actions.editPost)
  const setEditPostTitle = useStoreActions((actions)=> actions.setEditPostTitle)
  const setEditPostBody = useStoreActions((actions)=> actions.setEditPostBody)

  const history = useHistory();
  // go through the list of posts and find the post that matches the id requested
  const getPostById = useStoreState((state)=>state.getPostById)
  const post =  getPostById(id)
  // when the user wants to edit the post, the form will already be filled out using previously stored data from the posts array
  useEffect(() => {
    if (post) {
      setEditPostTitle(post.title);
      setEditPostBody(post.body);
    }
  }, [post, setEditPostTitle, setEditPostBody]);

  const handleEdit = (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editPostTitle,
      datetime,
      body: editPostBody,
    };
    editPost(updatedPost)
    history.push(`/post/${id}`)
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
            <button type="button" onClick={() => handleEdit(post.id)}>
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
