'use strict';

module.exports = function(app) {
  let stockService = require('../controllers/serviceController');
  let express = require('express');
  let StockMaster = require('../models/stockMaster');
  var PromisePool = require('es6-promise-pool')
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
          stockMarketPrice: data.np,
          created_at: new Date(),
        });
        return stockMaster.save();
      })
      .then((data)=>{
        res.send(data);
      })
      .catch((err) =>{
        res.send(err);
      });
    });

  app.route('/b')
  .get((req, res)=>{
    stockService.getArrList()
    .then(data => {
      return stockService.getStockMasterBatch(data);
    })
    .then(data => {
      return stockService.insertStockMasterBatch(data);
    })
    .then(data => {
      console.log(data.length);
      res.send(data);
    })
    .catch((err) =>{
      res.send(err);
    })
    ;
  });

  app.get('/', function (req, res) {

     res.send('Complete');
    
  });

};


