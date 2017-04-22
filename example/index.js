import { createVector as v2 } from '../index.es';

const createContext = (width, h) => Object.assign(document.createElement('canvas'), {
  width,
  height: h,
}).getContext('2d');

const Grid = (n, k) => Array.from({ length: n * k }).map((p, i) => v2(i % n, Math.floor(i / k)));
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

// Mid window
const center = v2(window.innerWidth, window.innerHeight).multiply(0.5);

// Mid canvas
const origin = v2(width, height).multiply(0.5);

// Mouse position
const needle = center.clone();

// Instead of cloning
const from = v => v2(v.x, v.y);

const rows = 10;
const cols = rows;
const cell = v2(width, height).divide(rows);
const half = cell.clone().multiply(0.5);
const grid = Grid(rows, cols).map(p => p.multiply(cell));
const peas = grid.map(p => from(p).add(half).subtract(origin));

const tick = fn => window.requestAnimationFrame(fn);
const draw = () => {
  context.clearRect(0, 0, width, height);

  grid.forEach((p, i) => {
    const c = peas[i];
    const a = needle.clone().subtract(center).subtract(c).angle();
    const l = Line(a, cell.x, cell.y);

    context.drawImage(l.canvas, p.x, p.y);
  });

  tick(draw);
};

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

