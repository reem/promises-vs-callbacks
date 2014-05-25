var _ = require('lodash');

module.exports = function (data, op, cb) {
  var results = [];
  nodeStyleEach(data, op, results.push.bind(results));

  until(function () {
    return results.length === data.length;
  }, 5, function () {
    cb(results);
  });
};

var until = function (condition, delay, cb) {
  var timer = setInterval(function () {
    if (condition()) {
      clearInterval(timer);
      cb();
    }
  }, delay);
};

var flip = function (func) {
  return function (x, y) {
    return func(y, x);
  };
};

var nodeStyleEach = function (data, op, cb) {
  _.each(data, _.partial(flip(op), cb));
};
