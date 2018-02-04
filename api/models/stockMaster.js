'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockMasterSchema = new Schema({
  stockCode: {
    type: Number,
    unique: false,
    required: true
  },
  stockChiName: {
    type: String,
    required: false
  },
  stockEngName: {
    type: String,
    required: false
  },
  stockMarketPrice: {
    type: String,
    required: true
  }
}, { collection: 'stockMaster' });

module.exports = mongoose.model('stockMaster', stockMasterSchema);