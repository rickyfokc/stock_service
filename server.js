'use strict';
// declare constants
const express = require('express');
const mongoose = require('mongoose');
const env = require('./config/env/development');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./api/routes/serviceRoutes'); //importing route
// define variables
var app = express();
mongoose.connect(env.db);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


routes(app);


app.listen(port);
console.log('Stock Service RESTful API server started on: ' + port);