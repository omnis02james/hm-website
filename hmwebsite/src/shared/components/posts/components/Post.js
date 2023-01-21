import React from "react";
import { Link } from 'react-router-dom';

import Card from '../../ui elements/Card'
import "./Post.css";

const Post = ({ post: {creator, title, imageURL, id } }) => {
    return (
        <Card className="post-content">
            <Link to={`/${id}`}>
                <div className="post-container">
                    <h1 className="heading">{title}</h1>
                    <h2 className="creator-name">{creator}</h2>
                    <img className="image" src={imageURL} alt="post image" />
                </div>
            </Link>
        </Card>
    );
};


export default Post;