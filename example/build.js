'use strict';

(function () {
  'use strict';

  // Economize a little when uglifying

  var M = Math;
  var merge = Object.assign;

  // Expects vector-like `Object` or `Number`
  var pointFrom = function pointFrom(n) {
    return merge({ x: n, y: n, z: n }, n);
  };

  // The extra slot can be useful in 2d even
  var Vector3d = {
    x: 0,
    y: 0,
    z: 0,

    // Scalars
    mag: function mag() {
      return M.sqrt(this.dot(this));
    },
    dist: function dist(a) {
      // Angle to
      return M.acos(this.dot(a) / (this.mag() * a.mag()));
    },
    dot: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    },


    // Math ops
    add: function add(v) {
      var p = pointFrom(v);

      this.x += p.x;
      this.y += p.y;
      this.z += p.z;

      return this;
    },
    subtract: function subtract(v) {
      var p = pointFrom(v);

      this.x -= p.x;
      this.y -= p.y;
      this.z -= p.z;

      return this;
    },
    multiply: function multiply(v) {
      var p = pointFrom(v);

      this.x *= p.x;
      this.y *= p.y;
      this.z *= p.z;

      return this;
    },
    divide: function divide(v) {
      var p = pointFrom(v);

      this.x /= p.x;
      this.y /= p.y;
      this.z /= p.z;

      return this;
    },
    cross: function cross(v) {
      this.x = v.y * this.z - v.z * this.y;
      this.y = v.z * this.x - v.x * this.z;
      this.z = v.x * this.y - v.y * this.x;

      return this;
    },


    // Compare
    equals: function equals(v) {
      return this.x === v.x && this.y === v.y && this.z === v.z;
    },


    // Copy
    clone: function clone() {
      return merge({}, this);
    },


    // Negate
    invert: function invert() {
      return this.multiply(-1);
    },


    // Limit
    normalise: function normalise() {
      return this.divide(this.mag());
    }
  };

  // Feels clunky somewhat, but going for default params adds way too many extras post transpile
  var createVector = function createVector(x, y, z) {
    return merge({}, Vector3d, { x: x || 0, y: y || 0, z: z || 0 });
  };

  // This is math I don't care to understand


  // Because hand in hand
  var TAU = M.PI * 2;

  // Might've been attached to some sort of a constructor, but this way ignored by default when bundling

  var createContext = function createContext(width, h) {
    return Object.assign(document.createElement('canvas'), {
      width: width,
      height: width || h
    }).getContext('2d');
  };

  var createPoints = function createPoints() {
    var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    return Array.from({ length: n }).map(function (point, i) {
      var a = i * TAU / n;
      var x = c * Math.cos(a);
      var y = c * Math.sin(a);

      return { x: x, y: y };
    });
  };

  var createTip = function createTip() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var center = size * 0.5;
    var points = createPoints(center);
    var output = createContext(size);

    output.save();
    output.translate(center, center);
    output.rotate(a);
    output.scale(s, s);

    output.beginPath();

    points.forEach(function (p) {
      output.lineTo(p.x, p.y);
    });

    output.closePath();
    output.restore();
    output.fill();

    return output;
  };

  var context = document.getElementById('canvas').getContext('2d');
  var _context$canvas = context.canvas,
      width = _context$canvas.width,
      height = _context$canvas.height;


  var center = createVector(window.innerWidth, window.innerHeight).multiply(0.5);
  var origin = createVector(width, height).multiply(0.5);

  var mouse = createVector();

  var tick = function tick(fn) {
    return window.requestAnimationFrame(fn);
  };
  var draw = function draw() {
    var size = Math.max(context.canvas.offsetWidth, context.canvas.offsetHeight);
    var zoom = Math.max(width, height) / size;
    var stop = zoom * size * 0.25;
    var tips = createPoints(size * 0.5 - 20, 20);

    var mousePos = mouse.clone().subtract(center).multiply(zoom);
    var x = mousePos.x,
        y = mousePos.y;


    var carto = createVector(x, y).normalise().multiply(stop);
    var angle = Math.atan2(carto.y, carto.x);

    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(origin.x, origin.y);
    context.rotate(angle);
    context.translate(-origin.x, -origin.y);

    tips.forEach(function (pos, i) {
      var _createTip = createTip(20, pos),
          canvas = _createTip.canvas;

      var l = origin.x + pos.x - 10;
      var t = origin.y + pos.y - 10;

      context.drawImage(canvas, l, t);
    });

    context.restore();

    tick(draw);
  };

  window.addEventListener('resize', function () {
    center.x = window.innerWidth * 0.5;
    center.y = window.innerHeight * 0.5;
  });

  // Where is touchmove handler?
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('load', function () {
    tick(draw);
  });
})();
