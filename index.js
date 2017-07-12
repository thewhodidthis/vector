'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Expects vector-like `Object` or `Number`
var pointFrom = function (n) { return Object.assign({ x: n, y: n }, n); };

// For composing with
var Vector2d = {
  x: 0,
  y: 0,

  // Scalars
  mag: function mag() {
    return Math.sqrt(this.dot(this))
  },
  dist: function dist(a) {
    // Angle between
    return Math.acos(this.dot(a) / (this.mag() * a.mag()))
  },
  angle: function angle() {
    // To angle
    return Math.atan2(this.y, this.x)
  },
  dot: function dot(v) {
    return (this.x * v.x) + (this.y * v.y)
  },

  // Math
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

    this.x /= p.x;
    this.y /= p.y;

    return this
  },

  // Transfer
  copy: function copy(v) {
    this.x = v.x;
    this.y = v.y;

    return this
  },

  // Duplicate
  clone: function clone() {
    return Object.assign({}, this)
  },

  // Compare
  equals: function equals(v) {
    return this.x === v.x && this.y === v.y
  },

  // Negate
  invert: function invert() {
    return this.multiply(-1)
  },

  // Scale
  normalise: function normalise() {
    return this.divide(this.mag())
  }
};

var createVector = function (x, y) { return Object.assign({}, Vector2d, { x: x || 0, y: y || 0 }); };

exports.Vector2d = Vector2d;
exports.createVector = createVector;

