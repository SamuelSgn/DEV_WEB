require('dotenv').config()
const mysql = require('mysql2');
const db = require('./config/db');
const fs = require('fs');
const express = require("express");
const app = express();
const {checkEmail, checkPassword, authToken} = require('./middleware/auth');
const port = process.env.PORT;
const cors = require('cors');
const body = require('body-parser');
const Roads = require('./routes/auth/auth');

app.post('/info', (req, res) => {
    res.send("Hello World!");
});

app.use(cors());

app.use(body.urlencoded({extended: false}));
app.use(body.json());

app.use(Roads);

app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port);
});
