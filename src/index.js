const mysql = require('mysql2');
const db = require('./config/db');
const express = require('express');
const app = express();
const {checkEmail, checkPassword} = require('./middleware/auth');
const have = require('dotenv');
have.config();
let port = process.env.PORTES;
const body = require('body-parser');
const Roads = require('./routes/auth/auth');

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use(body.urlencoded({extended: false}));
app.use(body.json());

app.use(Roads);

app.listen(3500, () =>{
    console.log('Example app listening at http://localhost:${3500}');
});