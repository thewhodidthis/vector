// Reset
const pointFrom = n => Object.assign({ x: n, y: n, z: n }, n);

// The extra slot can be useful in 2d even
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

export const TAU = Math.PI * 2;
export const rand = () => fromAngle(Math.random() * TAU, Math.asin((Math.random() * 2) - 1));
export const lerp = (a, b, fraction) => b.sub(a).mult(fraction).add(a);

