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

  // Instead of cloning all the time
  var vectorFrom = function vectorFrom(v) {
    return createVector(v.x, v.y);
  };

  // Prepare grid points array
  var createGrid = function createGrid(n) {
    return Array.from({ length: n * n }).map(function (p, i) {
      return createVector(i % n, Math.floor(i / n));
    });
  };

  var html = document.documentElement;
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // Adjustable
  var width = canvas.width,
      height = canvas.height,
      offsetWidth = canvas.offsetWidth,
      offsetHeight = canvas.offsetHeight;

  var viewW = window.innerWidth;
  var viewH = window.innerHeight;

  // Mid canvas
  var origin = createVector(width, height).multiply(0.5);

  // Store mouse position
  var needle = createVector();

  var gridSize = 12;
  var cell = createVector(width, height).divide(gridSize);
  var halfCell = vectorFrom(cell).multiply(0.5);

  var grid = createGrid(gridSize).map(function (p) {
    return p.multiply(cell).add(halfCell);
  });
  var gridFromOrigin = grid.map(function (p) {
    return vectorFrom(p).subtract(origin);
  });

  var pattern = document.createElement('canvas').getContext('2d');

  // Save on space
  pattern.canvas.width = cell.x;
  pattern.canvas.height = cell.y;

  // Prerender mother shape
  pattern.beginPath();
  pattern.moveTo(cell.x * 0.25, cell.y * 0.25);
  pattern.lineTo(cell.x * 0.6, halfCell.y);
  pattern.lineTo(cell.x * 0.25, cell.y * 0.75);
  pattern.closePath();
  pattern.fill();

  context.fillStyle = context.createPattern(pattern.canvas, 'no-repeat');

  var repeat = function repeat(fn) {
    return window.requestAnimationFrame(fn);
  };
  var render = function render() {
    var viewCenter = createVector(viewW, viewH).multiply(0.5);
    var canvasRect = createVector(offsetWidth, offsetHeight);
    var mouseScale = createVector(width, height).divide(canvasRect);

    context.clearRect(0, 0, width, height);

    grid.forEach(function (p, i) {
      var point = gridFromOrigin[i];
      var angle = vectorFrom(needle).subtract(viewCenter).multiply(mouseScale).subtract(point).angle();

      context.save();
      context.translate(p.x, p.y);
      context.rotate(angle);
      context.translate(-halfCell.x, -halfCell.y);
      context.fillRect(0, 0, cell.x, cell.y);
      context.restore();
    });

    repeat(render);
  };

  document.addEventListener('touchmove', function (e) {
    e.preventDefault();

    needle.x = e.pageX;
    needle.y = e.pageY;
  });

  document.addEventListener('mousemove', function (e) {
    e.preventDefault();

    needle.x = e.x;
    needle.y = e.y;
  });

  window.addEventListener('resize', function () {
    viewW = Math.max(window.innerWidth, html.clientWidth);
    viewH = Math.max(window.innerHeight, html.clientHeight);

    offsetWidth = canvas.offsetWidth;
    offsetHeight = canvas.offsetHeight;
  });

  window.addEventListener('load', function () {
    repeat(render);
  });
})();
