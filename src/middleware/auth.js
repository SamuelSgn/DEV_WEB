const express = require('express');
const mid = express();
const jwd = require('jsonwebtoken');
const connection = require("../config/db");
const encrypt = require('bcrypt');

function isValidEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function checkEmail(req, res, next){
    const mail= isValidEmail(req.body.email);
    if (mail){
        next();
    } else {
        res.send("Invalid email");
    }
}

function checkstring(str){
    return /^[A-Za-z0-9]*$/.test(str);
}

function isValidPassword(password){
    let isValid = checkstring(password);
    if (password.length >= 8 && isValid === true) {
        return true;
    } else {
        return false;
    }
}

function checkPassword(req, res, next){
    const words = isValidPassword(req.body.password);
    if (words) {
        next();
    } else {
        res.status(400).send("Invalid password or email address");
    }
}

function checkEmailExists(req, res, next){
    const query_mail = `SELECT * FROM user WHERE email = '${req.body.email}'`;
    connection.query(query_mail, [req.body.email], (err, result) => {
        if (err){
            res.send(err);
        } else {
            if (result.length > 0) {
                res.send('Account already exists');
            } else {
                next();
            }
        } 
    });
}

function LoginUser(req, res, next){
    const query_mail = `SELECT * FROM user WHERE email = '${req.body.email}'`;
    connection.query(query_mail, [req.body.email], (err, result) => {
        if (err){
            res.send(err);
        } else {
            if (result.length > 0) {
                encrypt.compare(req.body.password, result[0].password, (err, same) => {
                    if (err){
                        console.error(err);
                    } else {
                        if (same){
                            req.name = result[0].name;
                            req.id = result[0].id;
                            req.email = result[0].email;
                            next();
                        } else {
                            res.send("Incorrect password");
                        }
                    }
                });
            }
        }
    });
}

function authToken(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const response = jwd.verify(token, "ayasecret");
        req.name = response.name;
        req.id = response.id;
        req.email = response.email;
        next();
    } catch {
        res.status(401).json({message: "Invalid token authorization"});
    }
}

module.exports = {
    checkEmail,
    checkEmailExists,
    LoginUser,
    authToken,
    checkPassword
}
