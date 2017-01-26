function Vector(x, y, z) {
  this.reset(x, y, z);
}

Vector.prototype = {
  constructor: Vector,

  add(v) {
    return this.reset(Vector.add(this, v));
  },

  angleTo(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },

  clone() {
    return Vector.from(this);
  },

  cross(v) {
    return this.reset(Vector.cross(this, v));
  },

  divide(v) {
    return this.reset(Vector.divide(this, v));
  },

  dot(v) {
    return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
  },

  equals(v) {
    return (this.x === v.x) && (this.y === v.y) && (this.z === v.z);
  },

  invert() {
    return this.reset(Vector.invert(this));
  },

  length() {
    return Math.sqrt(this.dot(this));
  },

  max() {
    return Math.max(Math.max(this.x, this.y), this.z);
  },

  min() {
    return Math.min(Math.min(this.x, this.y), this.z);
  },

  multiply(v) {
    return this.reset(Vector.multiply(this, v));
  },

  normalize() {
    return this.divide(this.length());
  },

  reset(a, b, c) {
    if (a instanceof Vector) {
      this.x = a.x;
      this.y = a.y;
      this.z = a.z;
    } else {
      this.x = a || 0;
      this.y = b || 0;
      this.z = c || 0;
    }

    return this;
  },

  subtract(v) {
    return this.reset(Vector.subtract(this, v));
  },

  toAngle() {
    return Vector.fromAngle(Math.atan2(this.z, this.x), Math.asin(this.y / this.length()));
  },

  toArray(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  }
};

Vector.add = function add(a, b, c) {
  const result = c || new Vector();

  if (b instanceof Vector) {
    result.x = a.x + b.x;
    result.y = a.y + b.y;
    result.z = a.z + b.z;
  } else {
    result.x = a.x + b;
    result.y = a.y + b;
    result.z = a.z + b;
  }

  return result;
};

Vector.cross = function cross(a, b, c) {
  const result = c || new Vector();

  result.x = (b.y * a.z) - (b.z * a.y);
  result.y = (b.z * a.x) - (b.x * a.z);
  result.z = (b.x * a.y) - (b.y * a.x);

  return result;
};

Vector.dist = function dist(a, b) {
  return a.angleTo(b);
};

Vector.divide = function divide(a, b, c) {
  const result = c || new Vector();

  if (b instanceof Vector) {
    result.x = a.x / b.x;
    result.y = a.y / b.y;
    result.z = a.z / b.z;
  } else {
    result.x = a.x / b;
    result.y = a.y / b;
    result.z = a.z / b;
  }

  return result;
};

Vector.from = function from(a) {
  return new Vector(a.x, a.y, a.z);
};

Vector.fromAngle = function fromAngle(a, b) {
  let theta = a;
  let phi = b;

  if (a instanceof Vector) {
    theta = a.x;
    phi = a.y;
  }

  const x = Math.cos(theta) * Math.cos(phi);
  const y = Math.sin(phi);
  const z = Math.sin(theta) * Math.cos(phi);

  return new Vector(x, y, z);
};

Vector.fromArray = function fromArray(a) {
  return new Vector(a[0], a[1], a[2]);
};

Vector.invert = function invert(a, b) {
  const result = b || new Vector();

  result.x = -a.x;
  result.y = -a.y;
  result.z = -a.z;

  return result;
};

Vector.lerp = function lerp(a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};

Vector.max = function max(a, b) {
  return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};

Vector.min = function min(a, b) {
  return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};

Vector.multiply = function multiply(a, b, c) {
  const result = c || new Vector();

  if (b instanceof Vector) {
    result.x = a.x * b.x;
    result.y = a.y * b.y;
    result.z = a.z * b.z;
  } else {
    result.x = a.x * b;
    result.y = a.y * b;
    result.z = a.z * b;
  }

  return result;
};

Vector.normalize = function normalize(a, b) {
  const length = a.length();
  const result = b || new Vector();

  result.x = a.x / length;
  result.y = a.y / length;
  result.z = a.z / length;

  return result;
};

Vector.rand = function rand() {
  return Vector.fromAngle(Math.random() * Math.PI * 2, Math.asin((Math.random() * 2) - 1));
};

Vector.subtract = function subtract(a, b, c) {
  const result = c || new Vector();

  if (b instanceof Vector) {
    result.x = a.x - b.x;
    result.y = a.y - b.y;
    result.z = a.z - b.z;
  } else {
    result.x = a.x - b;
    result.y = a.y - b;
    result.z = a.z - b;
  }

  return result;
};

export default Vector;

