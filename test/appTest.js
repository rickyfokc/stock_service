'use strict';
const chai = require('chai');
const mongoose = require('mongoose');
const expect = chai.expect;
const assert = chai.assert;
let stockService = require('../api/controllers/serviceController');
var StockMaster = require('../api/models/stockMaster');

/*
test for geting stock data from money18
*/
describe('getRealTimePrice', function(){
    it('getRealTimePrice', function(){
        stockService.getRealTimePrice('03800')
        .then((data)=>{
            assert.isAtLeast(data.ltt.length,1,'retrun object length is greater then 1');
        });
    });
});

/*
test for geting stock master data from dbpower
*/
describe('getStockMaster', function(){
    it('getStockMaster', function(){
        stockService.getStockMaster('03800')
        .then((data)=>{
            assert.isAtLeast(data[0].length,1,'retrun object length is greater then 1');
        });
    });
});

/*
test for save stock master to mongodb
*/
describe('Database Tests', function() {
    before(function (done) {
        mongoose.connect('mongodb://admin:1234qwer@162.208.10.202:27017/stockapp');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
          console.log('We are connected to test database!');
          done();
        });
      });

    describe('Test Database', function() {
        //Save object with 'stockMaster'
        it('New Stock 99999 saved to test database', function(done) {
            let stockMaster = new StockMaster({
                stockCode: '99999',
                stockMarketPrice: '1.22',
                stockChiName: '保利協鑫能源',
                created_at: new Date(),
              });
     
              stockMaster.save(done);
        });

        it('Should retrieve data from test database', function(done) {
            //Look up the '99999' object previously saved.
            StockMaster.find({stockCode: '99999'}, (err, stockCode) => {
              if(err) {throw err;}
              if(stockCode.length === 0) {throw new Error('No data!');}
              done();
            });
        });

        it('Stock 99999 update 1 field from 1.22 to 9.99', function(done) {
            //update up the '99999' object previously saved.
            StockMaster.update(
                { stockCode: '99999' },
                { $set:
                   {
                    stockMarketPrice: '9.99'
                   }
                },(err, data) => {
                    if(err) {throw err;}
                    if(data.n === 0) {throw new Error('No data update!');}
                    done();
                  });
        });

        it('remove Stock 99999', function(done) {
            //update up the '99999' object previously saved.
            StockMaster.remove(
                { stockCode: '99999' }
                ,(err, data) => {
                    if(err) {throw err;}
                    if(data.n === 0) {throw new Error('No data remove!');}
                    done();
                  });
        });

    });
    //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});

