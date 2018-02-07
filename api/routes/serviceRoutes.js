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


  app.get('/', function (req, res) {
    res.send('Hello World!@');
  });

  app.route('/a')
  .get((req, res)=>{
    console.log('get master');
    stockService.getStockMaster('00000')
    .then(data => {
      res.send(data);
    });
  });

  app.route('/b')
  .get((req, res)=>{
    console.log('getArrList');
    stockService.getArrList()
    .then(data => {
      let promiseArr = [];
      for( let i = 0; i < data.length; i ++){
        promiseArr.push(stockService.getStockMaster(data[i]));
      }
      console.log(promiseArr);
      
      return Promise.all(promiseArr);
    })
    .then(data => {
      res.send(data);
    });
  });

};