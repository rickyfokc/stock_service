'use strict';

var request = require("request");
var scrapy = require('node-scrapy');

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
            console.log(stockCode);
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
            for (var i = 1; i < 10; i ++){
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

module.exports = {
    getRealTimePrice,
    getStockMaster,
    getArrList
};