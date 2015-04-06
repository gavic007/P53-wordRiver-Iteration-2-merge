'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StudentSchema = new Schema({
  "firstName": String,
  "lastName": String,
  "id": String,
  "studentContextPackArray": [{
    "packName": String,
    "tiles": [{
      "wordName": String,
      "wordType": String
    }]
  }],
  "studentWordArray": [String]
});

module.exports = mongoose.model('Student', StudentSchema);
