import { createVector as v2 } from '../index.es';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const { width, height } = canvas;

// Instead of cloning
const vectorFrom = v => v2(v.x, v.y);
const createGrid = (n, k) => Array.from({ length: n * k }).map((p, i) => v2(i % n, Math.floor(i / k)));
const getMouseSpeed = () => v2(width / canvas.offsetWidth, height / canvas.offsetHeight);

// Mid canvas
const origin = v2(width, height).multiply(0.5);

// Mid window
const center = v2(window.innerWidth, window.innerHeight).multiply(0.5);

// Mouse position
const needle = center.clone();

// For scaling mouse position
let mSpeed = getMouseSpeed();

const rows = 20;
const cols = rows;
const cell = v2(width, height).divide(rows);
const halfCell = vectorFrom(cell).multiply(0.5);

const grid = createGrid(rows, cols).map(p => p.multiply(cell).add(halfCell));
const peas = grid.map(p => vectorFrom(p).subtract(origin));

const tick = fn => window.requestAnimationFrame(fn);
const draw = () => {
  context.clearRect(0, 0, width, height);
  context.beginPath();

  grid.forEach((p, i) => {
    const angle = vectorFrom(needle).subtract(center).multiply(mSpeed).subtract(peas[i]).angle();

    context.save();
    context.translate(p.x, p.y);
    context.rotate(angle);
    context.moveTo(0, 0);
    context.lineTo(halfCell.y, 0);
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

