import React , { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Verify.css"
import Card from "../../shared/components/ui elements/Card";
import {Verification} from "../../verifyprocess/Verification"
import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'

export default function Signup(){
   
    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const form = e.target
        const user = {
            username: form[0].value,
            password: form[1].value
        }
        
        fetch("http://localhost:3060/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }

    useEffect(() => {
        fetch("http://localhost:3060/isUserAuth", {
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/"): null)
    }, [])

    return (
        <div className = "wholesignuppage">  
            <Card className="verify-card">
                <h2> Welcome to HiveMind!</h2>
                <form className="verify-form" onSubmit={event => handleRegister(event)}>
                    <input required type="username" placeholder="Enter a username"/>
                    <input required type="password" placeholder="Enter a password"/>
                    <button type="submit">Sign Up</button>
                </form>
            </Card>
        </div>
    )
    
}