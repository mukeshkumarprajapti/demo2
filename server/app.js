const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
 
 dotenv.config({ path: './config.env'});
require('./db/conn');
//   const User = require('./model/userSchema'); 
app.use(express.json());
app.use(cors())
app.use(require('./router/auth'));

const PORT = process.env.PORT




// middleware

const middleware = (req, res, next) => {
    console.log('hello my middleware')
    next();
}

app.get('/', (req, res) => {
    res.send('Hello world from homepage')
  
})

app.get('/about', middleware, (req, res) => {
    res.send('Hello world from about page')
})

app.get('/contact', (req, res) => {
    res.send('Hello world from contact page')
})

app.get('/signup', (req, res) => {
    res.send('Hello world from restation page')
})

app.get('/signin', (req, res) => {
    res.send('Hello world from login page')
})

app.listen(PORT, () => {
    console.log(`server start on http://localhost:${PORT}`)
})