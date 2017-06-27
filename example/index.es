import { createVector as Vector } from '../index.es';

// Instead of cloning all the time
const vectorFrom = v => Vector(v.x, v.y);

// Prepare grid points array
/* eslint max-len: "warn" */
const createGrid = v => Array.from({ length: v.x * v.y }).map((p, i) => Vector(i % v.x, Math.floor(i / v.x)));

const canvas = document.querySelector('canvas');
const master = canvas.getContext('2d');

// Window size
const viewport = Vector(window.innerWidth, window.innerHeight);

// Canvas size
const view = Vector(canvas.width, canvas.height);

// Canvas bounding rect
const offset = Vector(canvas.offsetWidth, canvas.offsetHeight);

// Canvas mid
const origin = view.clone().multiply(0.5);

// Mouse position
const needle = Vector();

// Grid stuff
const cellMag = 25;
const cellMid = cellMag * 0.5;
const cellN = view.clone().divide(cellMag);

const grid = createGrid(cellN).map(p => p.multiply(cellMag).add(cellMid));
const gridFromOrigin = grid.map(p => vectorFrom(p).subtract(origin));

// Draw gridlines
const guides = canvas.cloneNode().getContext('2d');

for (let i = 0; i < view.x; i += cellMag) {
  const x = i - 0.5;

  guides.moveTo(x, 0);
  guides.lineTo(x, view.y);
}

for (let i = 0; i < view.y; i += cellMag) {
  const y = i - 0.5;

  guides.moveTo(0, y);
  guides.lineTo(view.x, y);
}

guides.fillStyle = '#fff';
guides.fillRect(0, 0, view.x, view.y);
guides.strokeStyle = window.getComputedStyle(canvas).borderColor;
guides.stroke();

// Prerender mother shape
const cursor = document.createElement('canvas').getContext('2d');

// Save on space
Object.assign(cursor.canvas, { width: view.x, height: view.y });

// Prerender mother shape
cursor.beginPath();
cursor.moveTo(cellMag * 0.625, cellMag * 0.375);
cursor.lineTo(cellMag * 0.75, cellMid);
cursor.lineTo(cellMag * 0.625, cellMag * 0.625);
cursor.moveTo(cellMag * 0.25, cellMid);
cursor.lineTo(cellMag * 0.75, cellMid);
cursor.lineCap = 'square';
cursor.lineWidth = 1.5;
cursor.stroke();

master.fillStyle = master.createPattern(cursor.canvas, 'no-repeat');

const stop = id => window.cancelAnimationFrame(id);
const tick = fn => window.requestAnimationFrame(fn);
const draw = () => {
  const center = viewport.clone().multiply(0.5);
  const correction = view.clone().divide(offset);

  master.drawImage(guides.canvas, 0, 0);

  grid.forEach((p, i) => {
    const point = gridFromOrigin[i];
    const angle = vectorFrom(needle)
      .subtract(center)
      .multiply(correction)
      .subtract(point)
      .angle();

    master.save();
    master.translate(p.x, p.y);
    master.rotate(angle);
    master.translate(-cellMid, -cellMid);
    master.fillRect(0, 0, cellMag, cellMag);
    master.restore();
  });
};

let frameId = -1;

const move = (e) => {
  e.preventDefault();

  const pageX = e.pageX || (e.touches && e.touches[0].pageX);
  const pageY = e.pageY || (e.touches && e.touches[0].pageY);

  if (needle.x !== pageX || needle.y !== pageY) {
    frameId = tick(draw);
  } else {
    frameId = stop(frameId);
  }

  needle.x = pageX;
  needle.y = pageY;
};

['mousemove', 'touchmove', 'touchstart'].forEach((e) => {
  document.addEventListener(e, move);
});

const html = document.documentElement;

window.addEventListener('resize', () => {
  viewport.x = Math.max(window.innerWidth, html.clientWidth);
  viewport.y = Math.max(window.innerHeight, html.clientHeight);

  offset.x = canvas.offsetWidth;
  offset.y = canvas.offsetHeight;
});

window.addEventListener('load', () => {
  frameId = tick(draw);
});

