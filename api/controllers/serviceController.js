'use strict';

var request = require("request");
var stockNum;

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
module.exports = {
    getRealTimePrice: getRealTimePrice
};
