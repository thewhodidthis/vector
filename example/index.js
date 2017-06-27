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


  // Transfer
  copy: function copy(v) {
    this.x = v.x;
    this.y = v.y;

    return this;
  },


  // Duplicate
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
/* eslint max-len: "warn" */
var createGrid = function createGrid(v) {
  return Array.from({ length: v.x * v.y }).map(function (p, i) {
    return createVector(i % v.x, Math.floor(i / v.x));
  });
};

var canvas = document.querySelector('canvas');
var master = canvas.getContext('2d');

// Window size
var viewport = createVector(window.innerWidth, window.innerHeight);

// Canvas size
var view = createVector(canvas.width, canvas.height);

// Canvas bounding rect
var offset = createVector(canvas.offsetWidth, canvas.offsetHeight);

// Canvas mid
var origin = view.clone().multiply(0.5);

// Mouse position
var needle = createVector();

// Grid stuff
var cellMag = 25;
var cellMid = cellMag * 0.5;
var cellN = view.clone().divide(cellMag);

var grid = createGrid(cellN).map(function (p) {
  return p.multiply(cellMag).add(cellMid);
});
var gridFromOrigin = grid.map(function (p) {
  return vectorFrom(p).subtract(origin);
});

// Draw gridlines
var guides = canvas.cloneNode().getContext('2d');

for (var i = 0; i < view.x; i += cellMag) {
  var x = i - 0.5;

  guides.moveTo(x, 0);
  guides.lineTo(x, view.y);
}

for (var _i = 0; _i < view.y; _i += cellMag) {
  var y = _i - 0.5;

  guides.moveTo(0, y);
  guides.lineTo(view.x, y);
}

guides.fillStyle = '#fff';
guides.fillRect(0, 0, view.x, view.y);
guides.strokeStyle = window.getComputedStyle(canvas).borderColor;
guides.stroke();

// Prerender mother shape
var cursor = document.createElement('canvas').getContext('2d');

// Save on space
Object.assign(cursor.canvas, { width: view.x, height: view.y });

// Prerender mother shape
cursor.beginPath();
cursor.moveTo(cellMag * 0.625, cellMag * 0.375);
cursor.lineTo(cellMag * 0.75, cellMid);
cursor.lineTo(cellMag * 0.625, cellMag * 0.625);
cursor.moveTo(cellMag * 0.25, cellMid);
cursor.lineTo(cellMag * 0.75, cellMid);
cursor.lineCap = 'square';
cursor.lineWidth = 1.5;
cursor.stroke();

master.fillStyle = master.createPattern(cursor.canvas, 'no-repeat');

var stop = function stop(id) {
  return window.cancelAnimationFrame(id);
};
var tick = function tick(fn) {
  return window.requestAnimationFrame(fn);
};
var draw = function draw() {
  var center = viewport.clone().multiply(0.5);
  var correction = view.clone().divide(offset);

  master.drawImage(guides.canvas, 0, 0);

  grid.forEach(function (p, i) {
    var point = gridFromOrigin[i];
    var angle = vectorFrom(needle).subtract(center).multiply(correction).subtract(point).angle();

    master.save();
    master.translate(p.x, p.y);
    master.rotate(angle);
    master.translate(-cellMid, -cellMid);
    master.fillRect(0, 0, cellMag, cellMag);
    master.restore();
  });
};

var frameId = -1;

var move = function move(e) {
  e.preventDefault();

  var pageX = e.pageX || e.touches && e.touches[0].pageX;
  var pageY = e.pageY || e.touches && e.touches[0].pageY;

  if (needle.x !== pageX || needle.y !== pageY) {
    frameId = tick(draw);
  } else {
    frameId = stop(frameId);
  }

  needle.x = pageX;
  needle.y = pageY;
};

['mousemove', 'touchmove', 'touchstart'].forEach(function (e) {
  document.addEventListener(e, move);
});

var html = document.documentElement;

window.addEventListener('resize', function () {
  viewport.x = Math.max(window.innerWidth, html.clientWidth);
  viewport.y = Math.max(window.innerHeight, html.clientHeight);

  offset.x = canvas.offsetWidth;
  offset.y = canvas.offsetHeight;
});

window.addEventListener('load', function () {
  frameId = tick(draw);
});

}());
