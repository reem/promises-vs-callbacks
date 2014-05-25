module.exports = function (data, op, cb) {
  var notDone = data.length;
  var done = function () {
    notDone--;
  };

  var results = [];
  var collect = function (datum) {
    results.push(datum);
    done();
  };

  for (var i = 0; i < data.length; i++) {
    op(data[i], collect);
  }

  until(function () {
    return notDone === 0;
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