import { createVector as Vector } from '../index.es';

// Instead of cloning
const vectorFrom = v => Vector(v.x, v.y);

// Get grid points array
const createGrid = (n, k) => Array.from({ length: n * k }).map((p, i) => Vector(i % n, Math.floor(i / k)));

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let { width, height, offsetWidth, offsetHeight } = canvas;
let innerW = window.innerWidth;
let innerH = window.innerHeight

// Mid canvas
const origin = Vector(width, height).multiply(0.5);

// Track mouse position
const needle = Vector();

const rows = 8;
const cols = rows;
const cell = Vector(width, height).divide(rows);
const halfCell = vectorFrom(cell).multiply(0.5);

const grid = createGrid(rows, cols).map(p => p.multiply(cell).add(halfCell));
const gridFromOrigin = grid.map(p => vectorFrom(p).subtract(origin));

const pattern = document.createElement('canvas').getContext('2d');

pattern.font = `${cell.x}px monospace`;
pattern.textBaseline = 'middle';
pattern.fillText('\u2192', 0, cell.x * 0.25);

context.fillStyle = context.createPattern(pattern.canvas, 'repeat');

const repeat = fn => window.requestAnimationFrame(fn);
const render = () => {
  const bounds = Vector(offsetWidth, offsetHeight);
  const mspeed = Vector(width, height).divide(bounds);
  const center = Vector(innerW, innerH).multiply(0.5);

  context.clearRect(0, 0, width, height);

  grid.forEach((p, i) => {
    const point = gridFromOrigin[i];
    const angle = vectorFrom(needle).subtract(center).multiply(mspeed).subtract(point).angle();

    context.save();
    context.translate(p.x, p.y);
    context.rotate(angle);
    context.translate(-halfCell.x, -halfCell.y);
    context.fillRect(0, 0, cell.x, cell.y);
    context.restore();
  });

  repeat(render);
};

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  e.stopPropagation();

  needle.x = e.pageX;
  needle.y = e.pageY;
});

document.addEventListener('mousemove', (e) => {
  e.preventDefault();

  needle.x = e.x;
  needle.y = e.y;
});

let resizeTimer;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    innerW = window.innerWidth;
    innerH = window.innerHeight;

    offsetWidth = canvas.offsetWidth;
    offsetHeight = canvas.offsetHeight;
  }, 250);
});

window.addEventListener('load', () => {
  repeat(render);
});

