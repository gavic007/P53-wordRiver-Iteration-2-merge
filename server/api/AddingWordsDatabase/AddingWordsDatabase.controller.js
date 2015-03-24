'use strict';

var _ = require('lodash');
var AddingWordsDatabase = require('./AddingWordsDatabase.model.js');

// Get list of AddingWordsDatabases
exports.index = function(req, res) {
  AddingWordsDatabase.find(function (err, AddingWordsDatabases) {
    if(err) { return handleError(res, err); }
    return res.json(200, AddingWordsDatabases);
  });
};

// Get a single AddingWordsDatabase
exports.show = function(req, res) {
  console.log("this is the show in the addingWordsDatabase.controller at the beginning");
  AddingWordsDatabase.findById(req.params.id, function (err, AddingWordsDatabase) {
    if(err) { return handleError(res, err); }
    if(!AddingWordsDatabase) { return res.send(404); }
    console.log("this is the show in the addingWordsDatabase.controller before the return statement");
    return res.json(AddingWordsDatabase);
  });
};

// Creates a new AddingWordsDatabase in the DB.
exports.create = function(req, res) {
  console.log("this is the create in the addingWordsDatabase.controller at the beginning");
  AddingWordsDatabase.create(req.body, function(err, AddingWordsDatabase) {
    if(err) { return handleError(res, err); }
    console.log("this is the create in the addingWordsDatabase.controller before the return");
    return res.json(201, AddingWordsDatabase);
  });
};

// Updates an existing AddingWordsDatabase in the DB.
exports.update = function(req, res) {
  console.log("this is the update in the addingWordsDatabase.controller before the if statement");
  if(req.body._id) { delete req.body._id; }
  AddingWordsDatabase.findById(req.params.id, function (err, AddingWordsDatabase) {
    if (err) { return handleError(res, err); }
    if(!AddingWordsDatabase) { return res.send(404); }
    var updated = _.merge(AddingWordsDatabase, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      console.log("this is the update in the addingWordsDatabase.controller right before the return");
      return res.json(200, AddingWordsDatabase);
    });
  });
};

// Deletes a AddingWordsDatabase from the DB.
exports.destroy = function(req, res) {
  AddingWordsDatabase.findById(req.params.id, function (err, AddingWordsDatabase) {
    if(err) { return handleError(res, err); }
    if(!AddingWordsDatabase) { return res.send(404); }
    AddingWordsDatabase.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
