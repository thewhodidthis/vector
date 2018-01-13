'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.Vector2d = Vector2d;
exports.createVector = createVector;

