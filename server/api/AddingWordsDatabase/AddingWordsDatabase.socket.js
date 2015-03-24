/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var AddingWordsDatabase = require('./AddingWordsDatabase.model.js');

exports.register = function(socket) {
  AddingWordsDatabase.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  AddingWordsDatabase.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('AddingWordsDatabase:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('AddingWordsDatabase:remove', doc);
}
