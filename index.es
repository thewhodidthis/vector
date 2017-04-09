// Expects vector-like `Object` or `Number`
const pointFrom = n => Object.assign({ x: n, y: n }, n);

// For composing with
export const Vector2d = {
  x: 0,
  y: 0,

  // Scalars
  mag() {
    return Math.sqrt(this.dot(this));
  },
  dist(a) {
    // Angle to
    return Math.acos(this.dot(a) / (this.mag() * a.mag()));
  },
  angle() {
    // To angle
    return Math.atan2(this.y, this.x);
  },
  dot(v) {
    return (this.x * v.x) + (this.y * v.y);
  },

  // Math
  add(v) {
    const p = pointFrom(v);

    this.x += p.x;
    this.y += p.y;

    return this;
  },
  subtract(v) {
    const p = pointFrom(v);

    this.x -= p.x;
    this.y -= p.y;

    return this;
  },
  multiply(v) {
    const p = pointFrom(v);

    this.x *= p.x;
    this.y *= p.y;

    return this;
  },
  divide(v) {
    const p = pointFrom(v);

    this.x /= p.x;
    this.y /= p.y;

    return this;
  },

  // Copy
  clone() {
    return Object.assign({}, this);
  },

  // Compare
  equals(v) {
    return this.x === v.x && this.y === v.y;
  },

  // Negate
  invert() {
    return this.multiply(-1);
  },

  // Limit
  normalise() {
    return this.divide(this.mag());
  },
};

export const createVector = (x, y) => Object.assign({}, Vector2d, { x: x || 0, y: y || 0 });

