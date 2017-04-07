'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
var fromAngles = function fromAngles(theta, phi) {
  var x = M.cos(theta) * M.cos(phi);
  var y = M.sin(phi);
  var z = M.sin(theta) * M.cos(phi);

  return createVector(x, y, z);
};

// Because hand in hand
var TAU = M.PI * 2;

// Might've been attached to some sort of a constructor, but this way ignored by default when bundling
var rand = function rand() {
  return fromAngles(M.random() * TAU, M.asin(M.random() * 2 - 1));
};
var lerp = function lerp(a, b, fraction) {
  return b.sub(a).mult(fraction).add(a);
};

exports.Vector3d = Vector3d;
exports.createVector = createVector;
exports.fromAngles = fromAngles;
exports.TAU = TAU;
exports.rand = rand;
exports.lerp = lerp;
