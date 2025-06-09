require('dotenv').config();
const express = require("express");
const app = express();
const connection = require("../../config/db");
const body = require('body-parser');

app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.get('/user')