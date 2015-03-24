'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AddingWordsDatabaseSchema = new Schema({
    words:String
});

module.exports = mongoose.model('AddingWordsDatabase', AddingWordsDatabaseSchema);
