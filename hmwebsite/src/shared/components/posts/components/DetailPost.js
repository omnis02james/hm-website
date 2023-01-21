import React , { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import { NavLink } from 'react-router-dom';
import Card from '../../ui elements/Card'
import "./DetailPost.css";
import { useParams } from 'react-router-dom';

const DetailPost = ({ post: {creator, title, description, imageURL, id } }) => {
    
    
    const history = useHistory()
    const postId = useParams().postId;
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


    const handleDelete = () => {
        fetch(`http://localhost:3060/posts/${postId}`, {
        method: "DELETE"
        })
    };
    
    
    
    
    return (
        
        <Card className="post-content">
            <div className="post-container">
                <h1 className="heading">{title}</h1>                        
                <h2 className="creator-name">{creator}</h2>
                <p className="description">{description}</p>
                <img className="image" src={imageURL} alt="post" />
            </div>
           
            {isLoggedIn
                ? <div className="post-actions">
                        <NavLink to= {`${postId}/edit`}>
                          <button>Edit</button>  
                        </NavLink>
                        <NavLink to="/">
                           <button onClick={handleDelete}>Delete</button>
                        </NavLink>
                    </div>
                : 
                null 
                
            }
            
        </Card>

    );
    
    
};



export default DetailPost;