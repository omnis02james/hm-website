import logo from './logo.svg';
import './App.css';
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './shared/components/header/Header';
import Navigation from './shared/components/header/Navigation';
import Post from './shared/components/posts/components/Post';
import NewPost from './shared/components/posts/pages/NewPost';
import PostList from './shared/components/posts/components/PostList';
import UserPost from './shared/components/posts/pages/UserPost';
import UpdatePost from './shared/components/posts/pages/UpdatePost'
import Login from './user/pages/Login'
import Signup from './user/pages/Signup'
import { Verification } from './verifyprocess/Verification';
import {useHistory, Link} from 'react-router-dom'
import {useEffect} from 'react'

const App = () => {
  const history = useHistory()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('token');
    if (!userToken || userToken === 'undefined') {
        setIsLoggedIn(false);
        
    } else {
      setIsLoggedIn(true);
      console.log(isLoggedIn)
    }
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  let routes;
  {isLoggedIn
    ? routes = (
      <Switch>
        <Route path="/" exact>
         <PostList />
        </Route>
        <Route path="/posts/new" exact>       
          <NewPost />
          </Route>
        <Route path="/:postId" exact>
          <UserPost />
        </Route>
        <Route path="/:postId/edit">
          <UpdatePost />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
    : routes = (
      <Switch>
        <Route path="/" exact>
         <PostList />
        </Route>
        <Route path="/login" exact>
          <Login />
          </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/:postId" exact>
          <UserPost />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  
  return (
    <Router>
      <Navigation />
      <main>{routes}</main> 
    </Router>
  );
};

  export default App;