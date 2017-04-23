import { createVector as v2 } from '../index.es';

const createContext = (width, h) => Object.assign(document.createElement('canvas'), {
  width,
  height: h,
}).getContext('2d');

const Grid = (n, k) => Array.from({ length: n * k }).map((p, i) => v2(i % n, Math.floor(i / k)));

const rect = (w, h) => {

};

const Line = (a, w, h) => {
  const output = createContext(w, h);
  const x = w * 0.5;
  const y = h * 0.5;

  output.translate(x, y);
  output.rotate(a);

  output.fillStyle = '#000';
  output.fillRect(0, -1, y, 2);
  output.fill();

  return output;
};

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const { width, height } = canvas;

const getMouseSpeed = () => v2(width / canvas.offsetWidth, height / canvas.offsetHeight);

// Mid window
const center = v2(window.innerWidth, window.innerHeight).multiply(0.5);

// Mid canvas
const origin = v2(width, height).multiply(0.5);

// Mouse position
const needle = center.clone();

// For scaling mouse position
let mSpeed = getMouseSpeed();

// Instead of cloning
const from = v => v2(v.x, v.y);

const rows = 20;
const cols = rows;
const cell = v2(width, height).divide(rows);
const half = cell.clone().multiply(0.5);

const grid = Grid(rows, cols).map(p => p.multiply(cell).add(half));

const tick = fn => window.requestAnimationFrame(fn);
const draw = () => {
  context.clearRect(0, 0, width, height);
  context.beginPath();

  grid.forEach((p) => {
    const t = from(p).subtract(origin);
    const m = needle.clone().subtract(center).multiply(mSpeed).subtract(t);
    const a = m.angle();

    context.save();
    context.translate(p.x, p.y);
    context.rotate(a);
    context.moveTo(0, 0);
    context.lineTo(half.y, 0);
    context.restore();
  });

  context.closePath();
  context.stroke();

  tick(draw);
};

window.addEventListener('mousemove', (e) => {
  needle.x = e.x;
  needle.y = e.y;
});

window.addEventListener('resize', () => {
  center.x = window.innerWidth * 0.5;
  center.y = window.innerHeight * 0.5;

  mSpeed = getMouseSpeed();
});

window.addEventListener('load', () => {
  tick(draw);
});

document.addEventListener('click', () => {
  tick(draw);
});
