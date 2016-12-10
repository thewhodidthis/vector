'use strict';

function Vector(x, y, z) {
  this.reset(x, y, z);
}

Vector.prototype = {
  constructor: Vector,

  dot: function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  add: function add(v) {
    if (v instanceof Vector) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
    } else {
      this.x += v;
      this.y += v;
      this.z += v;
    }

    return new Vector(this.x, this.y, this.z);
  },
  subtract: function subtract(v) {
    if (v instanceof Vector) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
    } else {
      this.x -= v;
      this.y -= v;
      this.z -= v;
    }

    return new Vector(this.x, this.y, this.z);
  },
  multiply: function multiply(v) {
    if (v instanceof Vector) {
      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
    } else {
      this.x *= v;
      this.y *= v;
      this.z *= v;
    }

    return new Vector(this.x, this.y, this.z);
  },
  divide: function divide(v) {
    if (v instanceof Vector) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
    } else {
      this.x /= v;
      this.y /= v;
      this.z /= v;
    }

    return new Vector(this.x, this.y, this.z);
  },
  cross: function cross(v) {
    return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
  },
  equals: function equals(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  },
  length: function length() {
    return Math.sqrt(this.dot(this));
  },
  invert: function invert() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;

    return new Vector(this.x, this.y, this.z);
  },
  normalize: function normalize() {
    this.divide(this.length());

    return this;
  },
  min: function min() {
    return Math.min(Math.min(this.x, this.y), this.z);
  },
  max: function max() {
    return Math.max(Math.max(this.x, this.y), this.z);
  },
  angleTo: function angleTo(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  toAngle: function toAngle() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  },
  toArray: function toArray(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  },
  clone: function clone() {
    return new Vector(this.x, this.y, this.z);
  },
  reset: function reset(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    return this;
  }
};

Vector.add = function add(a, b, c) {
  var result = c || new Vector();

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

Vector.subtract = function subtract(a, b, c) {
  var result = c || new Vector();

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

Vector.multiply = function multiply(a, b, c) {
  var result = c || new Vector();

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

Vector.divide = function divide(a, b, c) {
  var result = c || new Vector();

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

Vector.cross = function cross(a, b, c) {
  var result = c || new Vector();

  result.x = a.y * b.z - a.z * b.y;
  result.y = a.z * b.x - a.x * b.z;
  result.z = a.x * b.y - a.y * b.x;

  return result;
};

Vector.invert = function invert(a, b) {
  var result = b;

  result.x = -a.x;
  result.y = -a.y;
  result.z = -a.z;

  return result;
};

Vector.normalize = function normalize(a, b) {
  var result = b;
  var length = a.length();

  result.x = a.x / length;
  result.y = a.y / length;
  result.z = a.z / length;

  return result;
};

Vector.min = function min(a, b) {
  return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};

Vector.max = function max(a, b) {
  return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};

Vector.rand = function rand() {
  return Vector.fromAngle(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};

Vector.lerp = function lerp(a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};

Vector.dist = function dist(a, b) {
  return a.angleTo(b);
};

Vector.fromAngle = function fromAngle(theta, phi) {
  var x = Math.cos(theta) * Math.cos(phi);
  var y = Math.sin(phi);
  var z = Math.sin(theta) * Math.cos(phi);

  return new Vector(x, y, z);
};

Vector.fromArray = function fromArray(a) {
  return new Vector(a[0], a[1], a[2]);
};

module.exports = Vector;
