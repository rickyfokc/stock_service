'use strict';
var express = require('express');

exports.get_all_users = function(req, res) {
    console.log( 'Get Users Requset - /models/serviceModel');
    var db = req.app.get("userdb");
    db.UserInfo.find((err, users) => {
        if(err){
            res.send(err);
        }
        res.json(users);
    });
};

exports.get_user = function(req, res,next) {
    console.log( 'Get All Single User Requset - /models/serviceModel');
    var db = req.app.get("userdb");
    db.UserInfo.find((err, users) => {
        if(err){
            res.send(err);
        }
        res.json(users);
    });
};