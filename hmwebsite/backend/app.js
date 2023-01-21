const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const usersRoute = require('./routes/users.js');
const postsRoute = require('./routes/posts.js');
const WebsiteError = require('./models/websiteError');
require('dotenv').config();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})
app.use('/users', usersRoute);
app.use('/posts', postsRoute);
app.post("/signup", async (req, res) => {
    const user = req.body;
    const takenUsername = await User.findOne({username: user.username})
    if(takenUsername){
      res.json({message: "Username has been taken"})
    }else{
      user.password = await bcrypt.hash(req.body.password, 10)
      const dbUser = new User ({
        username: user.username.toLowerCase(),
        password: user.password
      }) 
      dbUser.save()
      res.json({message:"success"})
    }
})
app.post("/login", (req, res) => { 
    const userLoggingIn = req.body;
    User.findOne({username: userLoggingIn.username})
    .then(dbUser => {
        if (!dbUser) {
            return res.json({
                message: "Invalid Username or Password"
            })
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then(isCorrect => {
            if (isCorrect) {
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username
                }       
                jwt.sign(
                    payload, 
                    process.env.JWT_SECRET,
                    {expiresIn: 86400},
                    (err, token) => {
                        if (err) return res.json({message: err})
                        return res.json({
                            message: "Success",
                            token: "Bearer " + token
                        })
                    }
                )
            } else {
                return res.json({
                    message: "Invalid Username or Password"
                })
            }
        })
    })
})
function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]
    if (token) {
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: "Verification fails"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            next()
        })
    } else {
        res.json({message: "Token is incorrect", isLoggedIn: false})
    }
}
app.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({isLoggedIn: true, username: req.user.username})
})
const port = 3060;
mongoose
  .connect('mongodb-connection-uri')
  .then(() => {
    app.listen(port);
    console.log(`Connected to port ${port}`);
  })
  .catch(err => {
    console.log(err);
  });
  
  
  
  
  