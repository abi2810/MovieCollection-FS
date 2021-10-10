const express = require('express');
const db = require('./../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = db.users;

var basicAuth = require('basic-auth');

const fetchParameters = async function(req, res) {
    let userDetails = basicAuth(req);
    if ((!userDetails.name) && (!userDetails.pass)) {
        res.status(400).send('Parameters are missing or invalid');
    } else {
        return userDetails;
    }
}

const checkUser = async function(username, res) {
    let getUser = await User.findOne({
        where: {
            username: username,
            is_active: 1
        }
    });
    return getUser;
}

const signup = async function(req, res) {
    try {
        let userDetails = await fetchParameters(req);
        let userExist = await checkUser(userDetails.name, res)
        let encryptedPassword = await bcrypt.hash(userDetails.pass, 10);
        if (userExist) {
            res.status(409).send('User Already Exist. Please Login');
        }
        let newUser = await User.create({
                username: userDetails.name,
                password: encryptedPassword
            }).then(async function(user) {
                let token = jwt.sign({
                    user_id: user.id,
                    username: user.username
                }, process.env.JWT_TOKEN);
                let result = {};
                result['id'] = user.id;
                result['username'] = user.username;
                result['token'] = token;
                res.status(200).json({
                    details: result
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

const login = async function(req, res) {
    try {
        let userDetails = await fetchParameters(req);
        let userExist = await checkUser(userDetails.name, res)
        if (userExist && (await bcrypt.compare(userDetails.pass, userExist.password))) {
            let token = await jwt.sign({
                user_id: userExist.id,
                username: userExist.username
            }, process.env.JWT_TOKEN);
            let result = {};
            result['id'] = userExist.id;
            result['username'] = userExist.username;
            result['token'] = token;
            res.status(200).json({
                details: result
            });
        } else {
            res.status(409).send('Login Failed');
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}


module.exports = {
    signup: signup,
    login: login
}
