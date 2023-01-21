import React, { useState } from 'react';
import Card from "../../ui elements/Card";
import '../../../../user/pages/Verify.css';
import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'

const NewPost = () => {
  const history = useHistory()
  const [username, setUsername] = useState(null)
  
    useEffect(() => {
      fetch("http://localhost:3060/isUserAuth", {
        method: "GET",
          headers: {
            "Content-type": "application/json",
              "x-access-token": localStorage.getItem("token")
          }
      })
      .then(res => res.json())
      .then(data => setUsername(data.username))
  }, [])

  

    function handleRegister(e) {
        e.preventDefault()
        const form = e.target
        const post = {
            title: form[0].value,
            description: form[1].value,
            imageURL: form[2].value,
            creator: username
        }
        fetch("http://localhost:3060/posts/new", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(post)
        })
    }
  return(
    <Card className="verify-card">
      <h2> Add a post! </h2>
      <form className="addpost" onSubmit={event => handleRegister(event)}>
        <input type = "title" placeholder="Enter a title"/>
        <textarea type = "description" cols="28" rows="3" placeholder="Enter a description"/>
        <input type = "imageURL" placeholder="Enter an image url"/>
        <button type="submit">Add Post</button>
      </form>
      </Card>
  );
}
export default NewPost;