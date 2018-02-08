'use strict';

var request = require("request");
var scrapy = require('node-scrapy');
var StockMaster = require('../models/stockMaster');

var getRealTimePrice = (stockNum) =>{
    return new Promise((resolve, reject) => {
        request("http://money18.on.cc/js/real/hk/quote/"+stockNum+"_r.js", function (error, response, body) {
            if (error) return reject(error);
            try {
                var phaseOne = 	body.substring(14);
                var phaseTwo = 	phaseOne.substring(0,phaseOne.length-3);
                var phaseThree = phaseTwo.replace(/'/g,'"');
                var phaseFour = JSON.parse(phaseThree);
                resolve(phaseFour);
            } catch(e) {
                reject(e);
            }
        });
    });
};



var  getStockMaster = (stockCode)=>{
    return new Promise((resolve, reject) => {
        try {
            var url = 'http://www.dbpower.com.hk/ch/quote/quote-stock/code/';
            var selector = ['.quote','.cp_title h2','.change span'];
            url = url + stockCode;
            scrapy.scrape(url, selector, function(err, data) {
                if (err) reject(err);
                resolve(data);
            });
        } catch(e) {
            reject(e);
        }
    });
};

var getArrList = () => {
    return new Promise((resolve, reject) => {
        try {
            let A = [];
            for (var i = 0; i < 60; i ++){
                if (i <10) A.push("0000"+i);
                else if (i <100) A.push("000"+i);
                else if (i <1000) A.push("00"+i);
                else if (i <10000) A.push("0"+i);
            }
            resolve(A);
        } catch(e) {
            reject(e);
        }
    });
};

var getStockMasterBatch = (batchArray) => {
    let promiseArr = [];
      for( let i = 0; i < batchArray.length; i ++){
        promiseArr.push(getStockMaster(batchArray[i]));
      }
      console.log('getStockMasterBatch length:' + promiseArr.length);
      
      return recurrMasterBatch (null,promiseArr,0 );
      //return Promise.all(promiseArr);
};

var recurrMasterBatch = (data,promiseArr,count ) => {
    count = count ||0;
    console.log(count);
    var l_count = count;
    var l_data = data||[];
    if (count === promiseArr.length){
        return data;
    }
    let tempArr = [];
    for(var i = count; i< count+10 ; i ++){
        tempArr.push(promiseArr[i]);
        l_count ++;
    }

    return Promise.all(tempArr)
            .then(result =>{
               return l_data.concat(result);
                
            })
            .then(result =>{
                return recurrMasterBatch(result,promiseArr,l_count);
            });

};

var insertStockMasterBatch = (batchStockData) =>{
    let promiseArr = [];
    console.log('batchStockData length:' + batchStockData.length);
      for (var i = 0; i < batchStockData.length; i++){
        if (batchStockData[i][0] !== null){
            console.log(batchStockData[i][1].substring(0, 5)+"|"+batchStockData[i][0]+"|"+batchStockData[i][1].substring(6));
            // let stockMaster = new StockMaster({
            //     stockCode: batchStockData[i][1].substring(0, 5),
            //     stockMarketPrice: batchStockData[i][0],
            //     stockChiName: batchStockData[i][1].substring(6),
            //     created_at: new Date(),
            //   });
            //   promiseArr.push(stockMaster.save());
        }
      }
      console.log(promiseArr.length);
      return Promise.all(promiseArr);
};

module.exports = {
    getRealTimePrice,
    getStockMaster,
    getArrList,
    getStockMasterBatch,
    insertStockMasterBatch
};