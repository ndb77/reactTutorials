import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About.js";
import Missing from "./Missing";
import EditPost from "./EditPost";
// import { DataProvider } from "./context/DataContext";
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import useAxiosFetch from "./hooks/useAxiosFetch";



// Router will go to the first matching page. tHis is why we need to use the "exact" phrase
function App() {
  const setPosts = useStoreActions((actions)=>actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);
  return (
    <div className="App">
      <Header title="React JS Blog" />
      {/* <DataProvider> */}
        <Nav />
        <Switch>
          <Route exact path="/" >
            <Home isLoading={isLoading} fetchError={fetchError}/>
          </Route>
          <Route exact path="/post" component={NewPost}></Route>
          <Route path="/edit/:id" component={EditPost}></Route>
          <Route path="/post/:id" component={PostPage}></Route>
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
      {/* </DataProvider> */}

      <Footer />
    </div>
  );
}

export default App;
