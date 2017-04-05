(function (exports) {
  'use strict';

  // For running callbacks in each direction
  var filter = function filter(fn, v) {
    return Object.keys({ x: 0, y: 0, z: 0 }).map(function (k) {
      return fn(k, v[k] !== undefined ? v[k] : v);
    });
  };

  // The extra slot can be useful in 2d even
  // Based on evanw/lightgl.js
  var Vector3d = function Vector3d(x, y, z) {
    return {
      x: x || 0,
      y: y || 0,
      z: z || 0,

      // Scalars
      mag: function mag() {
        return Math.sqrt(this.dot(this));
      },
      dist: function dist(a) {
        // Angle to
        return Math.acos(this.dot(a) / (this.mag() * a.mag()));
      },
      dot: function dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
      },


      // Math ops
      add: function add(v) {
        var _this = this;

        filter(function (k, v) {
          return _this[k] += v;
        }, v);

        return this;
      },
      subtract: function subtract(v) {
        var _this2 = this;

        filter(function (k, v) {
          return _this2[k] -= v;
        }, v);

        return this;
      },
      multiply: function multiply(v) {
        var _this3 = this;

        filter(function (k, v) {
          return _this3[k] *= v;
        }, v);

        return this;
      },
      divide: function divide(v) {
        var _this4 = this;

        filter(function (k, v) {
          return _this4[k] /= v;
        }, v);

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
        return Vector3d(this.x, this.y, this.z);
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
  };

  var fromAngle = function fromAngle(theta, phi) {
    var x = Math.cos(theta) * Math.cos(phi);
    var y = Math.sin(phi);
    var z = Math.sin(theta) * Math.cos(phi);

    return Vector3d(x, y, z);
  };

  var rand = function rand() {
    return fromAngle(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
  };
  var lerp = function lerp(a, b, fraction) {
    return b.sub(a).mult(fraction).add(a);
  };

  exports.Vector3d = Vector3d;
  exports.fromAngle = fromAngle;
  exports.rand = rand;
  exports.lerp = lerp;

}((this.Vector = this.Vector || {})));
//# sourceMappingURL=vector.js.map
