'use strict';

(function () {
  'use strict';

  // Reset

  var pointFrom = function pointFrom(n) {
    return Object.assign({ x: n, y: n, z: n }, n);
  };

  // The extra slot can be useful in 2d even
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
        var p = pointFrom(v);

        this.x += p.x;
        this.y += p.y;
        this.z += p.z;

        return this;
      },
      subtract: function subtract(v) {
        var p = pointFrom(v);

        this.x -= p.x;
        this.y -= p.y;
        this.z -= p.z;

        return this;
      },
      multiply: function multiply(v) {
        var p = pointFrom(v);

        this.x *= p.x;
        this.y *= p.y;
        this.z *= p.z;

        return this;
      },
      divide: function divide(v) {
        var p = pointFrom(v);

        this.x /= p.x;
        this.y /= p.y;
        this.z /= p.z;

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

  var TAU = Math.PI * 2;

  var thirty = TAU / 12;

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var width = canvas.width,
      height = canvas.height;


  var mouse = Vector3d();
  var center = Vector3d(window.innerWidth, window.innerHeight).multiply(0.5);

  var tick = function tick(fn) {
    return window.requestAnimationFrame(fn);
  };
  var draw = function draw() {
    var size = Math.max(canvas.offsetWidth, canvas.offsetHeight);
    var zoom = Math.max(width, height) / size;

    var mousePos = mouse.clone().subtract(center).multiply(zoom);
    var x = mousePos.x,
        y = mousePos.y;


    var radius = zoom * size * 0.25;
    var origin = Vector3d(width, height).multiply(0.5);
    var target = Vector3d(x, y).normalise().multiply(radius);

    context.clearRect(0, 0, width, height);

    var head = 10;
    var angle = Math.atan2(target.y, target.x);

    context.translate(origin.x, origin.y);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(target.x, target.y);

    var a1 = angle - thirty;
    var a2 = angle + thirty;
    var x1 = target.x - head * Math.cos(a1);
    var x2 = target.x - head * Math.cos(a2);
    var y1 = target.y - head * Math.sin(a1);
    var y2 = target.y - head * Math.sin(a2);

    context.lineTo(x1, y1);
    context.moveTo(target.x, target.y);
    context.lineTo(x2, y2);
    context.translate(-origin.x, -origin.y);
    context.stroke();

    var r = Math.min(0.5 * zoom * size - 4, Math.max(radius + 14, mousePos.mag()));

    context.beginPath();
    context.arc(origin.x, origin.y, r, 0, Math.PI * 2);
    context.closePath();
    context.stroke();

    // Repeat
    tick(draw);
  };

  window.addEventListener('resize', function () {
    center.x = window.innerWidth * 0.5;
    center.y = window.innerHeight * 0.5;
  });

  // Touchmove?
  window.addEventListener('mousemove', function (e) {
    e.preventDefault();

    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('load', function () {
    tick(draw);
  });

  context.strokeStyle = '#fff';
  context.strokeWidth = 2;
})();
