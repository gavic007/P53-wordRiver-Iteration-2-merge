'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Pack = require('./pack.model');

describe('GET /api/packs', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/packs')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('DELETE /api/packs/:id}', function() {
  var packID;
  before(function(done) {
    Pack.remove({}, function() {
      Pack.create({_id: 1234, packName: "random"}, done());
    });
  });

  after(function(done) {
    Pack.remove({}, done);
  });

  it('should delete the specified pack', function(done) {
    request(app)
      .delete('/api/packs/1234')
      .expect(200)
      .end(function (err, response) {
        Pack.findOne({packName: "random"}, function(err, pack) {
          if (err) return done(err);
          should(pack).equal(null);
          done();
        });
      });
  });
});
