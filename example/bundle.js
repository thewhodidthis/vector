(function () {
'use strict';

// Expects vector-like `Object` or `Number`
const pointFrom = v => Object.assign({ x: v, y: v }, v);

// For composing with
const Vector2d = {
  x: 0,
  y: 0,
  angle() {
    return Math.atan2(this.y, this.x)
  },
  length(v) {
    return Math.sqrt(this.dot(v || this))
  },
  dot(v) {
    return (this.x * v.x) + (this.y * v.y)
  },
  add(v) {
    const p = pointFrom(v);

    this.x += p.x;
    this.y += p.y;

    return this
  },
  subtract(v) {
    const p = pointFrom(v);

    this.x -= p.x;
    this.y -= p.y;

    return this
  },
  multiply(v) {
    const p = pointFrom(v);

    this.x *= p.x;
    this.y *= p.y;

    return this
  },
  divide(v) {
    const p = pointFrom(v);

    this.x /= p.x || 1;
    this.y /= p.y || 1;

    return this
  },
  copy(v) {
    this.x = v.x;
    this.y = v.y;

    return this
  },
  clone() {
    return Object.assign({}, this)
  },
  equals(v) {
    return this.x === v.x && this.y === v.y
  },
  invert() {
    return this.multiply(-1)
  },
  normalize() {
    return this.divide(this.length())
  }
};

const createVector = (x, y) => Object.assign({}, Vector2d, { x: x || 0, y: y || 0 });

const canvas = document.querySelector('canvas');
const target = canvas.getContext('2d');

const { width: w, height: h } = canvas;

const peak = (h * h) + (w * w);

const step = 20;
const edge = 6;
const span = step - edge;

const mark = document.createElement('canvas').getContext('2d');

mark.canvas.width = mark.canvas.height = step;
mark.lineWidth = 2;

mark.fillRect(0, 0, step, step);
mark.beginPath();

mark.moveTo(edge, edge);
mark.lineTo(span, span);
mark.moveTo(span, edge);
mark.lineTo(edge, span);

const colors = ['#fff', '#000', '#00b', '#0d0', '#dd0', '#d0d', '#0aa', '#d00'];
const shapes = Array.from(colors).map((seed, i) => {
  mark.fillRect(0, 0, step, step);
  mark.strokeStyle = colors[i];
  mark.stroke();

  return mark.createPattern(mark.canvas, '')
});

const random = n => Math.floor(Math.random() * n);
const points = Array.from(shapes).map(() => {
  const v = createVector();

  v.x = random(w);
  v.y = random(h);

  return v
});

const needle = createVector();
const center = createVector(window.innerWidth, window.innerHeight).multiply(0.5);
const offset = createVector(w, h).multiply(0.5);

const lookup = Array.from({ length: (w * h) / (step * step) }).map((v, i) => {
  const s = i * step;
  const x = s % w;
  const y = step * Math.floor(s / w);

  return createVector(x, y)
});

const tick = fn => window.requestAnimationFrame(fn);
const stop = id => window.cancelAnimationFrame(id);

let beat;

const draw = () => {
  const marker = needle.clone().subtract(center).add(offset);
  const master = points[0];

  master.copy(marker);

  // Voronoi loop adapted from
  // https://rosettacode.org/wiki/Voronoi_diagram#JavaScript
  lookup.forEach((p) => {
    let tip = peak;
    let idx = 0;

    points.forEach((spot, n) => {
      const copy = spot.clone();
      const dist = copy.subtract(p).dot(copy);

      if (dist < tip) {
        tip = dist;
        idx = n;
      }
    });

    target.fillStyle = shapes[idx];
    target.fillRect(p.x, p.y, step, step);
  });

  if (beat) {
    beat = stop(beat);
  }
};

const play = () => {
  if (!beat) {
    beat = tick(draw);
  }
};

const move = (e) => {
  e.preventDefault();

  needle.x = e.pageX || (e.touches && e.touches[0].pageX);
  needle.y = e.pageY || (e.touches && e.touches[0].pageY);

  play();
};

['mousemove', 'touchmove', 'touchstart'].forEach((e) => {
  document.addEventListener(e, move);
});

const html = document.documentElement;

window.addEventListener('resize', () => {
  const x = Math.max(window.innerWidth, html.clientWidth);
  const y = Math.max(window.innerHeight, html.clientHeight);

  center.copy({ x, y }).multiply(0.5);
});

window.addEventListener('load', play);

}());
