import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from "../../ui elements/Card";
import {useHistory} from 'react-router-dom'

import '../../../../user/pages/Verify.css';
import "./UpdatePost.css";  
  const UpdatePost = () => {
    const history = useHistory()
    const [username, setUsername] = useState(null)
    const postId = useParams().postId;
    useEffect(() => {
      fetch("http://localhost:3060/isUserAuth", {
          headers: {
            'Content-Type': 'application/json',
              "x-access-token": localStorage.getItem("token")
          }
      })
      .then(res => res.json())
      .then(data => data.isLoggedIn ? setUsername(data.username): null)
  }, [])

    async function handleUpdate(e) {
        e.preventDefault()

        const form = e.target
        const post = {
            title: form[0].value,
            description: form[1].value,
            imageURL: form[2].value,
            creator: username
        }
        
        fetch(`http://localhost:3060/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(post)
        })
    }
    
  return(
    <Card className="verify-card">
      <h2> Update Post </h2>
      <form className="addpost" onSubmit={event => handleUpdate(event)}>
        <input type = "title" placeholder="Enter a title"/>
        <textarea type = "description" cols="28" rows="3" placeholder="Enter a description"/>
        <input type = "imageURL" placeholder="Enter an image url"/>
        <button type="submit">Update Post</button>
      </form>
      </Card>
  );

  }

  export default UpdatePost;