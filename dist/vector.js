(function (exports) {
  'use strict';

  var M = Math;
  var TAU = M.PI * 2;
  var random = M.random;

  var merge = Object.assign;

  var point = function point(p) {
    return merge({ x: p, y: p, z: p }, p);
  };

  var Vector3D = function Vector3D(x, y, z) {
    return merge({ x: x || 0, y: y || 0, z: z || 0 }, {
      mag: function mag() {
        return M.sqrt(this.dot(this));
      },
      dot: function dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
      },
      add: function add(v) {
        var p = point(v);

        this.x += p.x;
        this.y += p.y;
        this.z += p.z;

        return this;
      },
      sub: function sub(v) {
        var p = point(v);

        this.x -= p.x;
        this.y -= p.y;
        this.z -= p.z;

        return this;
      },
      mult: function mult(v) {
        var p = point(v);

        this.x *= p.x;
        this.y *= p.y;
        this.z *= p.z;

        return this;
      },
      cross: function cross(v) {
        var p = point(v);

        this.x = p.y * this.z - p.z * this.y;
        this.y = p.z * this.x - p.x * this.z;
        this.z = p.x * this.y - p.y * this.x;

        return this;
      },
      divide: function divide(v) {
        var p = point(v);

        this.x /= p.x;
        this.y /= p.y;
        this.z /= p.z;

        return this;
      },
      equals: function equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
      },
      invert: function invert() {
        return this.mult(-1);
      },
      norm: function norm() {
        return this.divide(this.mag());
      },
      dist: function dist(a) {
        return M.acos(this.dot(a) / (this.mag() * a.mag()));
      }
    });
  };

  var fromAngle = function fromAngle(a, b) {
    var theta = a.x || a;
    var phi = a.y || b;

    var x = M.cos(theta) * M.cos(phi);
    var y = M.sin(phi);
    var z = M.sin(theta) * M.cos(phi);

    return Vector(x, y, z);
  };

  var rand = function rand() {
    return fromAngle(random() * TAU, M.asin(random() * 2 - 1));
  };
  var lerp = function lerp(a, b, fraction) {
    return b.sub(a).mult(fraction).add(a);
  };

  exports.Vector3D = Vector3D;
  exports.fromAngle = fromAngle;
  exports.rand = rand;
  exports.lerp = lerp;

}((this.Vector = this.Vector || {})));
//# sourceMappingURL=vector.js.map
