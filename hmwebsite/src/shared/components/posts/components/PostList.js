import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post'
import './PostList.css';

const Posts = () => {
    const [error, setError] = useState();
    const [loadedPosts, setLoadedPosts] = useState();
    
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const response = await fetch('http://localhost:3060/posts/all');
    
            const responseData = await response.json();
    
            setLoadedPosts(responseData.posts);
          } catch (err) {
            setError(err.message);
          }
        };
        sendRequest();
      }, []);
    

    return (
        
        <div className="postContainer">
            {loadedPosts && loadedPosts.map((post) => (
                <Post post={post}/>
            ))}
        </div>
        
    );
};

export default Posts;