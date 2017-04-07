// Economize a little when uglifying
const M = Math;
const merge = Object.assign;

// Expects vector-like `Object` or `Number`
const pointFrom = n => merge({ x: n, y: n, z: n }, n);

// The extra slot can be useful in 2d even
export const Vector3d = {
  x: 0,
  y: 0,
  z: 0,

  // Scalars
  mag() {
    return M.sqrt(this.dot(this));
  },
  dist(a) {
    // Angle to
    return M.acos(this.dot(a) / (this.mag() * a.mag()));
  },
  dot(v) {
    return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
  },

  // Math ops
  add(v) {
    const p = pointFrom(v);

    this.x += p.x;
    this.y += p.y;
    this.z += p.z;

    return this;
  },
  subtract(v) {
    const p = pointFrom(v);

    this.x -= p.x;
    this.y -= p.y;
    this.z -= p.z;

    return this;
  },
  multiply(v) {
    const p = pointFrom(v);

    this.x *= p.x;
    this.y *= p.y;
    this.z *= p.z;

    return this;
  },
  divide(v) {
    const p = pointFrom(v);

    this.x /= p.x;
    this.y /= p.y;
    this.z /= p.z;

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
    return merge({}, this);
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

// Feels clunky somewhat, but going for default params adds way too many extras post transpile
export const createVector = (x, y, z) => merge({}, Vector3d, { x: x || 0, y: y || 0, z: z || 0 });

// This is math I don't care to understand
export const fromAngles = (theta, phi) => {
  const x = M.cos(theta) * M.cos(phi);
  const y = M.sin(phi);
  const z = M.sin(theta) * M.cos(phi);

  return createVector(x, y, z);
};

// Because hand in hand
export const TAU = M.PI * 2;

// Might've been attached to some sort of a constructor, but this way ignored by default when bundling
export const rand = () => fromAngles(M.random() * TAU, M.asin((M.random() * 2) - 1));
export const lerp = (a, b, fraction) => b.sub(a).mult(fraction).add(a);

