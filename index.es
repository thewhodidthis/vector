// For running callbacks in each direction
const filter = (fn, v) => Object.keys({ x: 0, y: 0, z: 0 }).map(k => fn(k, v[k] !== undefined ? v[k] : v));

// The extra slot can be useful in 2d even
// Based on evanw/lightgl.js
export const Vector3d = (x, y, z) => ({
  x: x || 0,
  y: y || 0,
  z: z || 0,

  // Scalars
  mag() {
    return Math.sqrt(this.dot(this));
  },
  dist(a) {
    // Angle to
    return Math.acos(this.dot(a) / (this.mag() * a.mag()));
  },
  dot(v) {
    return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
  },

  // Math ops
  add(v) {
    filter((k, v) => this[k] += v, v);

    return this;
  },
  subtract(v) {
    filter((k, v) => this[k] -= v, v);

    return this;
  },
  multiply(v) {
    filter((k, v) => this[k] *= v, v);

    return this;
  },
  divide(v) {
    filter((k, v) => this[k] /= v, v);

    return this;
  },
  cross(v) {
    this.x = (v.y * this.z) - (v.z * this.y);
    this.y = (v.z * this.x) - (v.x * this.z);
    this.z = (v.x * this.y) - (v.y * this.x);

    return this;
  },

  // Compare
  equals(v) {
    return (this.x === v.x) && (this.y === v.y) && (this.z === v.z);
  },

  // Copy
  clone() {
    return Vector3d(this.x, this.y, this.z);
  },

  // Negate
  invert() {
    return this.multiply(-1);
  },

  // Limit
  normalise() {
    return this.divide(this.mag());
  },
});

export const fromAngle = (theta, phi) => {
  const x = Math.cos(theta) * Math.cos(phi);
  const y = Math.sin(phi);
  const z = Math.sin(theta) * Math.cos(phi);

  return Vector3d(x, y, z);
};

export const rand = () => fromAngle(Math.random() * Math.PI * 2, Math.asin((Math.random() * 2) - 1));
export const lerp = (a, b, fraction) => b.sub(a).mult(fraction).add(a);

