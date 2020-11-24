// @ts-nocheck
"use strict";

var throttle = require("..");

var test = require("tape");

test("wrapping", function (t) {
  t.plan(3);
  t.timeoutAfter(10000);

  // Wrap a function returning a value.
  throttle(
    function (a, b) {
      return a + b;
    },
    1,
    1000
  )("foo", "bar").then((value) => {
    t.equal(value, "foobar");
  });

  // Wrap a function returning a Promise that resolves.
  throttle(
    function (value) {
      return Promise.resolve(value);
    },
    1,
    1000
  )("foo").then((value) => {
    t.equal(value, "foo");
  });

  // Wrap a function returning a Promise that rejects.
  throttle(
    function (value) {
      return Promise.reject(value);
    },
    1,
    1000
  )("foo").catch((error) => {
    t.equal(error, "foo");
  });
});

test("method", function (t) {
  t.plan(1);
  t.timeoutAfter(10000);

  // Wrap a method.
  var obj = { foo: "bar" };
  obj.f = throttle(
    function () {
      t.equal(this.foo, "bar");
    },
    1,
    1000
  );

  obj.f();
});

test("simulate", function (t) {
  var THROTTLE_COUNT = 10;
  var THROTTLE_WINDOW = 0.1;
  var REQUESTS = 1000;
  var DURATION = 5;
  var MAX_DELAY = 0.025;

  t.timeoutAfter((REQUESTS * (THROTTLE_WINDOW / THROTTLE_COUNT + MAX_DELAY) + DURATION) * 1000);
  t.plan(1);

  var rateExceeded = 0;
  var timestamps = [];
  var f = throttle(
    function () {
      return new Promise(function (resolve, reject) {
        // Simulate network delay to a server.
        setTimeout(function () {
          // Verify the rate at the server.
          var timestamp = Date.now();
          if (
            timestamps.length >= THROTTLE_COUNT &&
            timestamp - timestamps[timestamps.length - THROTTLE_COUNT] < THROTTLE_WINDOW
          )
            ++rateExceeded;

          timestamps.push(timestamp);
          resolve();

          if (timestamps.length == REQUESTS) t.equal(rateExceeded, 0);
        }, Math.random() * MAX_DELAY * 1000);
      });
    },
    THROTTLE_COUNT,
    THROTTLE_WINDOW * 1000
  );

  // Call the throttled function at random times.
  for (var i = 0; i < REQUESTS; ++i) setTimeout(f, Math.random() * DURATION * 1000);
});
