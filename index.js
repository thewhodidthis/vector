'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Expects vector-like `Object` or `Number`
const pointFrom = v => Object.assign({ x: v, y: v }, v);

// For composing with
const Vector2d = {
  x: 0,
  y: 0,
  angle() {
    return Math.atan2(this.y, this.x)
  },
  length(v) {
    return Math.sqrt(this.dot(v || this))
  },
  dot(v) {
    return (this.x * v.x) + (this.y * v.y)
  },
  add(v) {
    const p = pointFrom(v);

    this.x += p.x;
    this.y += p.y;

    return this
  },
  subtract(v) {
    const p = pointFrom(v);

    this.x -= p.x;
    this.y -= p.y;

    return this
  },
  multiply(v) {
    const p = pointFrom(v);

    this.x *= p.x;
    this.y *= p.y;

    return this
  },
  divide(v) {
    const p = pointFrom(v);

    this.x /= p.x || 1;
    this.y /= p.y || 1;

    return this
  },
  copy(v) {
    this.x = v.x;
    this.y = v.y;

    return this
  },
  clone() {
    return Object.assign({}, this)
  },
  equals(v) {
    return this.x === v.x && this.y === v.y
  },
  invert() {
    return this.multiply(-1)
  },
  normalize() {
    return this.divide(this.length())
  }
};

const createVector = (x, y) => Object.assign({}, Vector2d, { x: x || 0, y: y || 0 });

exports.Vector2d = Vector2d;
exports.createVector = createVector;
