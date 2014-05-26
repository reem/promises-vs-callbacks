var _ = require('lodash');
var Q = require('q');

module.exports = function (data, promiseCreator) {
  return squash(_.map(data, promiseCreator));
 };

 var squash = function (data) {
    return _.reduce(data, function (accPromise, promise) {
      return accPromise.then(function (acc) {
        return promise.then(function (val) {
          acc.push(val);
          return acc;
        });
      });
    }, Q([]));
 };