import React , { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Links.css';
import {useHistory, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
const Links = props => {
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

  const logout = () => {
    localStorage.removeItem("token")
    history.push("/")
  };
  
    
    return (
        <nav>
            {isLoggedIn
            ? <div>
                <ul className="navigationBarLinks">
                    <li>
                        <NavLink to="/posts/new">
                                Add Post
                        </NavLink>
                    </li>
                    <li>
                       <button onClick = {logout}>Sign Out
                        </button>
                    </li>

                </ul>
                </div>
            : <div>
                <ul className="navigationBarLinks">
                    <li>
                        <NavLink to="/login">
                            Sign In
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup">
                            Sign Up
                        </NavLink>
                    </li>
                </ul>
                </div>
            }     
        </nav>
           );
        };
    export default Links;


