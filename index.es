const M = Math;
const TAU = M.PI * 2;
const random = M.random;

const merge = Object.assign;

const Point = { x: 0, y: 0, z: 0 };
const point = p => merge({ x: p, y: p, z: p }, p);

export const Vector3D = (x, y, z) => merge({ x: x || 0, y: y || 0, z: z || 0 }, {
  mag() {
    return M.sqrt(this.dot(this));
  },
  dot(v) {
    return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
  },
  add(v) {
    const p = point(v);

    this.x += p.x;
    this.y += p.y;
    this.z += p.z;

    return this;
  },
  sub(v) {
    const p = point(v);

    this.x -= p.x;
    this.y -= p.y;
    this.z -= p.z;

    return this;
  },
  mult(v) {
    const p = point(v);

    this.x *= p.x;
    this.y *= p.y;
    this.z *= p.z;

    return this;
  },
  cross(v) {
    const p = point(v);

    this.x = (p.y * this.z) - (p.z * this.y);
    this.y = (p.z * this.x) - (p.x * this.z);
    this.z = (p.x * this.y) - (p.y * this.x);

    return this;
  },
  divide(v) {
    const p = point(v);

    this.x /= p.x;
    this.y /= p.y;
    this.z /= p.z;

    return this;
  },
  equals(v) {
    return (this.x === v.x) && (this.y === v.y) && (this.z === v.z);
  },
  invert() {
    return this.mult(-1);
  },
  norm() {
    return this.divide(this.mag());
  },
  dist(a) {
    return M.acos(this.dot(a) / (this.mag() * a.mag()));
  },
});

export const fromAngle = (a, b) => {
  const theta = a.x || a;
  const phi = a.y || b;

  const x = M.cos(theta) * M.cos(phi);
  const y = M.sin(phi);
  const z = M.sin(theta) * M.cos(phi);

  return Vector(x, y, z);
};

export const rand = () => fromAngle(random() * TAU, M.asin((random() * 2) - 1));
export const lerp = (a, b, fraction) => b.sub(a).mult(fraction).add(a);

