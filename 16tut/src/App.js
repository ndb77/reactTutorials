import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About.js";
import Missing from "./Missing";
import EditPost from "./EditPost";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { format } from "date-fns";
import api from './api/posts'
// Router will go to the first matching page. tHis is why we need to use the "exact" phrase
function App() {
  const [search, setSearch] = useState("");
  const [searchResuts, setSearchResults] = useState([]);
  const history = useHistory();
  
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostBody, setEditPostBody] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async () =>{
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      }catch(err){
        if(err.response){
          //not in 200 response range
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }else{
          console.log(`Error:' ${err.message}`)
        }

      }
    }
    fetchPosts();
  },[])
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    ); // converting everything to lowercase before searching
      setSearchResults(filteredResults.reverse())
  }, [posts, search]);

  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`)
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      history.push("/"); // uses the history to return back to the home page
    }catch(err){
      console.log(`Error: ${err.message}`)
    }

  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editPostTitle, datetime, body: editPostBody };

    try{
      const response = await api.put(`/posts/${id}`,updatedPost)
      // map creates a new array
      // finds the post by id within the posts array state and passes in the new data to the state
      setPosts(posts.map(post => post.id=== id ? {...response.data}:post))
      setEditPostTitle('')
      setEditPostBody('')
      history.push('/')
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // get the id of the post -- if there is a length, get the id of the last post, if there are no posts, id =1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];

    try{
      const response = await api.post('/posts',newPost)
      const allPosts = [...posts,response.data]
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      history.push("/");
    }catch(err){
      console.log(`Error: ${err.message}`)
    }

  };
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home posts={searchResuts} />
        </Route>
        <Route exact path="/post">
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/edit/:id">
          <EditPost
            posts = {posts}
            handleEdit={handleEdit}
            editPostTitle={editPostTitle}
            setEditPostTitle={setEditPostTitle}
            editPostBody={editPostBody}
            setEditPostBody={setEditPostBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
