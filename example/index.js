import { createVector as Vector } from '../index.es';

// Instead of cloning all the time
const vectorFrom = v => Vector(v.x, v.y);

// Prepare grid points array
const createGrid = n => Array.from({ length: n * n }).map((p, i) => Vector(i % n, Math.floor(i / n)));

const html = document.documentElement;
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Adjustable
let { width, height, offsetWidth, offsetHeight } = canvas;
let viewW = window.innerWidth;
let viewH = window.innerHeight

// Mid canvas
const origin = Vector(width, height).multiply(0.5);

// Store mouse position
const needle = Vector();

const gridSize = 12;
const cell = Vector(width, height).divide(gridSize);
const halfCell = vectorFrom(cell).multiply(0.5);

const grid = createGrid(gridSize).map(p => p.multiply(cell).add(halfCell));
const gridFromOrigin = grid.map(p => vectorFrom(p).subtract(origin));

const pattern = document.createElement('canvas').getContext('2d');

// Save on space
pattern.canvas.width = cell.x;
pattern.canvas.height = cell.y;

// Prerender mother shape
pattern.beginPath();
pattern.moveTo(cell.x * 0.25, cell.y * 0.25);
pattern.lineTo(cell.x * 0.6, halfCell.y);
pattern.lineTo(cell.x * 0.25, cell.y * 0.75);
pattern.closePath();
pattern.fill();

context.fillStyle = context.createPattern(pattern.canvas, 'no-repeat');

const repeat = fn => window.requestAnimationFrame(fn);
const render = () => {
  const viewCenter = Vector(viewW, viewH).multiply(0.5);
  const canvasRect = Vector(offsetWidth, offsetHeight);
  const mouseScale = Vector(width, height).divide(canvasRect);

  context.clearRect(0, 0, width, height);

  grid.forEach((p, i) => {
    const point = gridFromOrigin[i];
    const angle = vectorFrom(needle).subtract(viewCenter).multiply(mouseScale).subtract(point).angle();

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

window.addEventListener('resize', () => {
  viewW = Math.max(window.innerWidth, html.clientWidth);
  viewH = Math.max(window.innerHeight, html.clientHeight);

  offsetWidth = canvas.offsetWidth;
  offsetHeight = canvas.offsetHeight;
});

window.addEventListener('load', () => {
  repeat(render);
});

