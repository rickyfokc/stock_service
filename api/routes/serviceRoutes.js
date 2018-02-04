'use strict';

module.exports = function(app) {
  let stockService = require('../controllers/serviceController');
  let express = require('express');
  let StockMaster = require('../models/stockMaster');
  var Item = require('../models/item');

  // // Service Price Routes
  // app.route('/stock/:stockNum')
  //   .get(stockService.get_real_time_price);

  // // User Routes
  // app.route('/users')
  //   .get(userData.get_all_users);

  // app.route('/user/:id')
  // .get(userData.get_user);

  app.route('/stock/:stockNum')
    .get((req, res)=>{
      console.log('get price');
      stockService.getRealTimePrice(req.params.stockNum)
      .then((data)=>{
        console.log('save to mongo');
        var stockMaster = new StockMaster({
          stockCode: req.params.stockNum,
          stockMarketPrice: data.np
        });
        return stockMaster.save();
      })
      .then((data)=>{
        res.send(data);
      });
    });

  app.route('/item')
    .get(function (request, response) {

      console.log('POST /items');

    var item = new Item({
      "id": "1",
      "name": "React.js Essentials",
      "description": "A fast-paced guide to designing and building scalable and maintainable web apps with React.js.",
      "quantity": "10"
    });

    item.save();

    response.status(201).send(item);
  });

  app.get('/', function (req, res) {
    res.send('Hello World!@');
  });


};