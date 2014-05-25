var _ = require('lodash');
var Q = require('q');

module.exports = function (data, promiseCreator) {
  return _(data)
    .map(promiseCreator)
    .reduce(function (acc, promise) {
      return combine(acc, promise).then(function (pair) {
        pair[0].push(pair[1]);
        return pair[0];
      });
    }, Q([]));
};

var combine = function (firstPromise, secondPromise) {
  var defer = Q.defer();
  firstPromise.then(function (firstVal) {
    secondPromise.then(function (secondVal) {
      defer.resolve([firstVal, secondVal]);
    });
  });
  return defer.promise;
};