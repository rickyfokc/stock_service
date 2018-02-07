'use strict';
const assert = require('chai').assert;
var getRealTimePrice = require('../api/controllers/serviceController');


describe('getRealTimePrice', function(){
    it('getRealTimePrice should return Json', function(){
        getRealTimePrice('03800')
        .then((data)=>{
            assert.equal(typeof(data),typeof(JSON));
        });
    });
});