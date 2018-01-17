(function () {
'use strict';

// Expects vector-like `Object` or `Number`
var pointFrom = function (v) { return Object.assign({ x: v, y: v }, v); };

// For composing with
var Vector2d = {
  x: 0,
  y: 0,
  angle: function angle() {
    return Math.atan2(this.y, this.x)
  },
  length: function length(v) {
    return Math.sqrt(this.dot(v || this))
  },
  dot: function dot(v) {
    return (this.x * v.x) + (this.y * v.y)
  },
  add: function add(v) {
    var p = pointFrom(v);

    this.x += p.x;
    this.y += p.y;

    return this
  },
  subtract: function subtract(v) {
    var p = pointFrom(v);

    this.x -= p.x;
    this.y -= p.y;

    return this
  },
  multiply: function multiply(v) {
    var p = pointFrom(v);

    this.x *= p.x;
    this.y *= p.y;

    return this
  },
  divide: function divide(v) {
    var p = pointFrom(v);

    this.x /= p.x || 1;
    this.y /= p.y || 1;

    return this
  },
  copy: function copy(v) {
    this.x = v.x;
    this.y = v.y;

    return this
  },
  clone: function clone() {
    return Object.assign({}, this)
  },
  equals: function equals(v) {
    return this.x === v.x && this.y === v.y
  },
  invert: function invert() {
    return this.multiply(-1)
  },
  normalize: function normalize() {
    return this.divide(this.length())
  }
};

var createVector = function (x, y) { return Object.assign({}, Vector2d, { x: x || 0, y: y || 0 }); };

var canvas = document.querySelector('canvas');
var target = canvas.getContext('2d');

var w = canvas.width;
var h = canvas.height;

var peak = (h * h) + (w * w);

var step = 20;
var edge = 6;
var span = step - edge;

var mark = document.createElement('canvas').getContext('2d');

mark.canvas.width = mark.canvas.height = step;
mark.lineWidth = 2;

mark.fillRect(0, 0, step, step);
mark.beginPath();

mark.moveTo(edge, edge);
mark.lineTo(span, span);
mark.moveTo(span, edge);
mark.lineTo(edge, span);

var colors = ['#fff', '#000', '#00b', '#0d0', '#dd0', '#d0d', '#0aa', '#d00'];
var shapes = Array.from(colors).map(function (seed, i) {
  mark.fillRect(0, 0, step, step);
  mark.strokeStyle = colors[i];
  mark.stroke();

  return mark.createPattern(mark.canvas, '')
});

var random = function (n) { return Math.floor(Math.random() * n); };
var points = Array.from(shapes).map(function () {
  var v = createVector();

  v.x = random(w);
  v.y = random(h);

  return v
});

var needle = createVector();
var center = createVector(window.innerWidth, window.innerHeight).multiply(0.5);
var offset = createVector(w, h).multiply(0.5);

var lookup = Array.from({ length: (w * h) / (step * step) }).map(function (v, i) {
  var s = i * step;
  var x = s % w;
  var y = step * Math.floor(s / w);

  return createVector(x, y)
});

var tick = function (fn) { return window.requestAnimationFrame(fn); };
var stop = function (id) { return window.cancelAnimationFrame(id); };

var beat;

var draw = function () {
  var marker = needle.clone().subtract(center).add(offset);
  var master = points[0];

  master.copy(marker);

  // Voronoi loop adapted from
  // https://rosettacode.org/wiki/Voronoi_diagram#JavaScript
  lookup.forEach(function (p) {
    var tip = peak;
    var idx = 0;

    points.forEach(function (spot, n) {
      var copy = spot.clone();
      var dist = copy.subtract(p).dot(copy);

      if (dist < tip) {
        tip = dist;
        idx = n;
      }
    });

    target.fillStyle = shapes[idx];
    target.fillRect(p.x, p.y, step, step);
  });

  if (beat) {
    beat = stop(beat);
  }
};

var play = function () {
  if (!beat) {
    beat = tick(draw);
  }
};

var move = function (e) {
  e.preventDefault();

  needle.x = e.pageX || (e.touches && e.touches[0].pageX);
  needle.y = e.pageY || (e.touches && e.touches[0].pageY);

  play();
};

['mousemove', 'touchmove', 'touchstart'].forEach(function (e) {
  document.addEventListener(e, move);
});

var html = document.documentElement;

window.addEventListener('resize', function () {
  var x = Math.max(window.innerWidth, html.clientWidth);
  var y = Math.max(window.innerHeight, html.clientHeight);

  center.copy({ x: x, y: y }).multiply(0.5);
});

window.addEventListener('load', play);

}());

