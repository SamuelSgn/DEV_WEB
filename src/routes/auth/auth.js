const express = require('express');
const Roads = express();
const body = require('body-parser');
const {checkEmail, checkEmailExists, checkPassword, LoginUser, authToken} = require('../../middleware/auth');
const connection = require('../../config/db');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let global = '';

Roads.use(body());
Roads.post('/signup', checkEmail, checkEmailExists, checkPassword, (req, res) => {
    res.send('Account created successfully');
});

Roads.post('/register', checkEmailExists, function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var firstname = req.body.firstname;

    let salt = bcrypt.genSaltSync(10);
    global = bcrypt.hashSync(password, salt);

    password = global;
    var info = [
        email,
        password,
        name,
        firstname
    ];

    connection.query('INSERT INTO user(email, password, name, firstname) VALUES(?,?,?,?)', info, function (err, result) {
        if (err){
            console.log(err);
            res.status(500).json({message: 'Database error'});
        } else {
            res.status(200).json({message: 'Successfully registered'});
        }
    });
});

Roads.post('/auth', authToken, function(req, res){
    let user_identity = {
        name: req.name,
        id: req.id,
        email: req.email
    }
    res.json({ message: user_identity.name + ' is connected'});
});

Roads.post('/login', LoginUser, function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    let identity = {
        name: req.name,
        id: req.id,
        email: req.email
    }
    let token = jwt.sign(identity, "kitchen");
    res.status(200).json({token});
});

module.exports = Roads;