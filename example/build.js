'use strict';

(function () {
  'use strict';

  // Expects vector-like `Object` or `Number`

  var pointFrom = function pointFrom(n) {
    return Object.assign({ x: n, y: n }, n);
  };

  // For composing with
  var Vector2d = {
    x: 0,
    y: 0,

    // Scalars
    mag: function mag() {
      return Math.sqrt(this.dot(this));
    },
    dist: function dist(a) {
      // Angle between
      return Math.acos(this.dot(a) / (this.mag() * a.mag()));
    },
    angle: function angle() {
      // To angle
      return Math.atan2(this.y, this.x);
    },
    dot: function dot(v) {
      return this.x * v.x + this.y * v.y;
    },


    // Math
    add: function add(v) {
      var p = pointFrom(v);

      this.x += p.x;
      this.y += p.y;

      return this;
    },
    subtract: function subtract(v) {
      var p = pointFrom(v);

      this.x -= p.x;
      this.y -= p.y;

      return this;
    },
    multiply: function multiply(v) {
      var p = pointFrom(v);

      this.x *= p.x;
      this.y *= p.y;

      return this;
    },
    divide: function divide(v) {
      var p = pointFrom(v);

      this.x /= p.x;
      this.y /= p.y;

      return this;
    },


    // Copy
    clone: function clone() {
      return Object.assign({}, this);
    },


    // Compare
    equals: function equals(v) {
      return this.x === v.x && this.y === v.y;
    },


    // Negate
    invert: function invert() {
      return this.multiply(-1);
    },


    // Scale
    normalise: function normalise() {
      return this.divide(this.mag());
    }
  };

  var createVector = function createVector(x, y) {
    return Object.assign({}, Vector2d, { x: x || 0, y: y || 0 });
  };

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var width = canvas.width,
      height = canvas.height;

  // Instead of cloning

  var vectorFrom = function vectorFrom(v) {
    return createVector(v.x, v.y);
  };
  var createGrid = function createGrid(n, k) {
    return Array.from({ length: n * k }).map(function (p, i) {
      return createVector(i % n, Math.floor(i / k));
    });
  };
  var getMouseSpeed = function getMouseSpeed() {
    return createVector(width / canvas.offsetWidth, height / canvas.offsetHeight);
  };

  // Mid canvas
  var origin = createVector(width, height).multiply(0.5);

  // Mid window
  var center = createVector(window.innerWidth, window.innerHeight).multiply(0.5);

  // Mouse position
  var needle = center.clone();

  // For scaling mouse position
  var mSpeed = getMouseSpeed();

  var rows = 20;
  var cols = rows;
  var cell = createVector(width, height).divide(rows);
  var halfCell = vectorFrom(cell).multiply(0.5);

  var grid = createGrid(rows, cols).map(function (p) {
    return p.multiply(cell).add(halfCell);
  });
  var peas = grid.map(function (p) {
    return vectorFrom(p).subtract(origin);
  });

  var tick = function tick(fn) {
    return window.requestAnimationFrame(fn);
  };
  var draw = function draw() {
    context.clearRect(0, 0, width, height);
    context.beginPath();

    grid.forEach(function (p, i) {
      var angle = vectorFrom(needle).subtract(center).multiply(mSpeed).subtract(peas[i]).angle();

      context.save();
      context.translate(p.x, p.y);
      context.rotate(angle);
      context.moveTo(0, 0);
      context.lineTo(halfCell.y, 0);
      context.restore();
    });

    context.closePath();
    context.stroke();

    tick(draw);
  };

  window.addEventListener('mousemove', function (e) {
    needle.x = e.x;
    needle.y = e.y;
  });

  window.addEventListener('resize', function () {
    center.x = window.innerWidth * 0.5;
    center.y = window.innerHeight * 0.5;

    mSpeed = getMouseSpeed();
  });

  window.addEventListener('load', function () {
    tick(draw);
  });
})();
