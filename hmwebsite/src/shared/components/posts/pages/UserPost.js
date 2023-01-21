import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import DetailPost from '../components/DetailPost';

const UserPost = () => {
    const [error, setError] = useState();
    const [loadedPost, setLoadedPost] = useState();
    const postId = useParams().postId;
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const response = await fetch(`http://localhost:3060/posts/${postId}`, {
                method: "GET"
            });
    
            const responseData = await response.json();
    
            if (!response.ok) {
              console.log(responseData.message);
            }
    
            setLoadedPost(responseData.post);
          } catch (err) {
            setError(err.message);
          }
        };
        sendRequest();
      }, []);

   return (
        <div>
            {loadedPost &&
                <DetailPost post={loadedPost}/>
            }
        </div>
   );
  };

export default UserPost;