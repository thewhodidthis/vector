import { createVector as v2 } from '../index.es';

const createContext = (width, h) => Object.assign(document.createElement('canvas'), {
  width,
  height: width || h,
}).getContext('2d');

const Grid = (n, k = n) => Array.from({ length: n * k }).map((p, i) => v2(i % n, Math.floor(i / k)));

const Line = (a = 0, w = 50, h = 50) => {
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

const context = document.getElementById('canvas').getContext('2d');
const { width, height } = context.canvas;

// Mid window
const center = v2(window.innerWidth, window.innerHeight).multiply(0.5);

// Mid canvas
const origin = v2(width, height).multiply(0.5);

// Mouse position
const needle = center.clone();

const rows = 10;
const cell = v2(width, height).divide(rows);
const grid = Grid(rows).map(p => p.multiply(cell));
const half = cell.clone().multiply(0.5);

const tick = fn => window.requestAnimationFrame(fn);
const draw = () => {
  context.clearRect(0, 0, width, height);

  grid.forEach((p) => {
    const t = p.clone().add(half).subtract(origin);
    const a = needle.clone().subtract(center).subtract(t).angle();
    const l = Line(a, cell.x, cell.y);

    context.drawImage(l.canvas, p.x, p.y);
  });

  tick(draw);
};

// Where is the touchmove handler?
window.addEventListener('mousemove', (e) => {
  needle.x = e.x;
  needle.y = e.y;
});

window.addEventListener('resize', () => {
  center.x = window.innerWidth * 0.5;
  center.y = window.innerHeight * 0.5;
});

window.addEventListener('load', () => {
  tick(draw);
});

