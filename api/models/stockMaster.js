'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockMasterSchema = new Schema({
  stockCode: {
    type: String,
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
  },
  created_at: Date,
  updated_at: Date
}, { collection: 'stockMaster' });

stockMasterSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('stockMaster', stockMasterSchema);