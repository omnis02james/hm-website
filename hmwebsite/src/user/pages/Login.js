import React , { useContext } from 'react';
import { Link} from 'react-router-dom';
import "./Verify.css"
import Card from "../../shared/components/ui elements/Card";
import { Verification } from "../../verifyprocess/Verification"
import { useHistory } from 'react-router'
import { useEffect, useLayoutEffect, useState} from 'react'

function Login(){

    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkTokenOfUser = () => {
        console.log(isLoggedIn)
        const tokenUser = localStorage.getItem('token');
        console.log(tokenUser +"before function runs")
        if(!tokenUser || tokenUser === 'undefined'){
            setIsLoggedIn(false);
            console.log("checkTokenOfUser is not logged in")
            
        }
        else {
        setIsLoggedIn(true);
        history.push('http://localhost:3060/');
        console.log("checkTokenOfUser is logged in")
        console.log(isLoggedIn)
        console.log(tokenUser +"after function runs")
        }
    }   
    function handleLogin(e) {
        e.preventDefault()
        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

       
        fetch("http://localhost:3060/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },

            
        
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)
        })
        const tokenItem = localStorage.getItem('token');
        console.log(tokenItem)
        
        
    }
    useEffect(() => {
        checkTokenOfUser();
    }, [isLoggedIn]);    
   

    return (
        <div className = "wholeloginpage">  
            <Card className="verify-card">
                <h2> Welcome Again! </h2>
                <form className="verify-form" onSubmit={event => handleLogin(event)}>
                    <input type = "username" placeholder="Enter your username"/>
                    <input type = "password" placeholder="Enter your password"/>
                    <button type="submit">Log In</button>
                </form>
            </Card>
        </div>
    )
}
export default Login;
