var expect      = require('chai').expect;
var callbackMap = require('./callbackMap.js');
var promiseMap  = require('./promiseMap.js');
var Q           = require('q');

describe('Callback Map', function () {
  var data;
  before(function () {
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  });

  it('should provide the results of mapping an asynchronous operation over an array', function (done) {
    callbackMap(data, function (datum, callback) {
      setTimeout(function () {
        callback(datum * 2);
      });
    }, function (results) {
      for (var i = 0; i < results.length; i++) {
        expect(results[i]).to.equal(data[i] * 2);
      }
      done();
    });
  });
});

describe('Promises Map', function () {
  var data;
  before(function () {
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  });

  it('should provide the results of mapping an asynchronous operation over an array', function (done) {
    promiseMap(data, function (datum) {
      return Q(datum * 2);
    }).then(function (results) {
      for (var i = 0; i < results.length; i++) {
        expect(results[i]).to.equal(data[i] * 2);
      }
      done();
    });    
  });
});