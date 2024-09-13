const express = require('express');
const Roads = express();
const body = require('body-parser');
const {checkEmail, checkEmailExists, checkPassword, LoginUser, authToken} = require('../../middleware/auth');
const connection = require('../../config/db');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let global = '';

Roads.use(body.urlencoded({extended: true}));
Roads.use(body.json());

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

Roads.post('/auth', authToken, function(req, res) {
    let user_identity = {
        name: req.name,
        id: req.id,
        email: req.email,
        firstname: req.firstname
    }
    res.json({ message: user_identity.name + user_identity.firstname + ' is connected'});
});

Roads.post('/login', LoginUser, function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    let identity = {
        name: req.name,
        id: req.id,
        email: req.email
    }
    let token = jwt.sign(identity, "ayasecret");
    res.status(200).json({token});
});

Roads.get('/User', authToken, function(req, res) {
    const query_connect = `SELECT * FROM user WHERE id = '${req.id}`;
    connection.query(query_connect, [req.id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result[0].email);
        }
    });
});

module.exports = Roads;
