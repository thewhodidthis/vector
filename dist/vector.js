var Vector = (function () {
  'use strict';

  function Vector(x, y, z) {
    this.reset(x, y, z);
  }

  Vector.prototype = {
    constructor: Vector,

    add: function add(v) {
      return Vector.add(v, this);
    },
    angleTo: function angleTo(a) {
      return Math.acos(this.dot(a) / (this.length() * a.length()));
    },
    clone: function clone() {
      return new Vector(this.x, this.y, this.z);
    },
    cross: function cross(v) {
      return Vector.cross(v, this);
    },
    divide: function divide(v) {
      return Vector.divide(v, this);
    },
    dot: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    equals: function equals(v) {
      return this.x === v.x && this.y === v.y && this.z === v.z;
    },
    invert: function invert() {
      return Vector.invert(this);
    },
    length: function length() {
      return Math.sqrt(this.dot(this));
    },
    max: function max() {
      return Math.max(Math.max(this.x, this.y), this.z);
    },
    min: function min() {
      return Math.min(Math.min(this.x, this.y), this.z);
    },
    multiply: function multiply(v) {
      return Vector.multiply(v, this);
    },
    normalize: function normalize() {
      return this.divide(this.length());
    },
    reset: function reset(x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;

      return this;
    },
    subtract: function subtract(v) {
      return Vector.subtract(v, this);
    },
    toAngle: function toAngle() {
      return {
        theta: Math.atan2(this.z, this.x),
        phi: Math.asin(this.y / this.length())
      };
    },
    toArray: function toArray(n) {
      return [this.x, this.y, this.z].slice(0, n || 3);
    }
  };

  Vector.add = function add(a, b, c) {
    var result = c || b || new Vector();

    if (a instanceof Vector) {
      result.x = b.x + a.x;
      result.y = b.y + a.y;
      result.z = b.z + a.z;
    } else {
      result.x = b.x + a;
      result.y = b.y + a;
      result.z = b.z + a;
    }

    return result;
  };

  Vector.cross = function cross(a, b, c) {
    var result = c || b || new Vector();

    result.x = b.y * a.z - b.z * a.y;
    result.y = b.z * a.x - b.x * a.z;
    result.z = b.x * a.y - b.y * a.x;

    return result;
  };

  Vector.dist = function dist(a, b) {
    return a.angleTo(b);
  };

  Vector.divide = function divide(a, b, c) {
    var result = c || b || new Vector();

    if (a instanceof Vector) {
      result.x = b.x / a.x;
      result.y = b.y / a.y;
      result.z = b.z / a.z;
    } else {
      result.x = b.x / a;
      result.y = b.y / a;
      result.z = b.z / a;
    }

    return result;
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

  Vector.invert = function invert(a, b) {
    var result = b || new Vector();

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
    var result = c || b || new Vector();

    if (a instanceof Vector) {
      result.x = b.x * a.x;
      result.y = b.y * a.y;
      result.z = b.z * a.z;
    } else {
      result.x = b.x * a;
      result.y = b.y * a;
      result.z = b.z * a;
    }

    return result;
  };

  Vector.normalize = function normalize(a, b) {
    var length = a.length();
    var result = b || new Vector();

    result.x = a.x / length;
    result.y = a.y / length;
    result.z = a.z / length;

    return result;
  };

  Vector.rand = function rand() {
    return Vector.fromAngle(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
  };

  Vector.subtract = function subtract(a, b, c) {
    var result = c || b || new Vector();

    if (a instanceof Vector) {
      result.x = b.x - a.x;
      result.y = b.y - a.y;
      result.z = b.z - a.z;
    } else {
      result.x = b.x - a;
      result.y = b.y - a;
      result.z = b.z - a;
    }

    return result;
  };

  return Vector;

}());
//# sourceMappingURL=vector.js.map
