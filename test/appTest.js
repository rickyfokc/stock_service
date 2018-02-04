'use strict';
const assert = require('chai').assert;
const chaiTest = require('../chaiTest');
const env = require('../config/env/development');
const getRealTimePrice = require('../api/controllers/serviceController');

describe('chaiTest', function(){
    it('chaiTest should return Hello', function(){
        assert.equal(chaiTest(),'Hello')
    });
});

describe('env', function(){
    it('env should return String', function(){
        assert.equal(typeof(env.db),typeof('Hello'));
    });
});

describe('getRealTimePrice', function(){
    it('getRealTimePrice should return Json', function(){
        getRealTimePrice('03800')
        .then((data)=>{
            assert.equal(typeof(data),typeof(JSON));
        });
    });
});