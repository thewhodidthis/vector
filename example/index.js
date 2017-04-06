import { Vector3d as Vector, TAU } from '../index.es';

const thirty = TAU / 12;

const context = document.getElementById('canvas').getContext('2d');

const w = context.canvas.width;
const h = context.canvas.height;

const center = Vector(window.innerWidth, window.innerHeight).multiply(0.5);
const mouse = Vector();

const tick = (fn) => window.requestAnimationFrame(fn);
const draw = () => {
  const size = Math.max(context.canvas.offsetWidth, context.canvas.offsetHeight);
  const zoom = Math.max(w, h) / size;

  const mousePos = mouse.clone().subtract(center).multiply(zoom);
  const { x, y } = mousePos;

  const radius = zoom * size * 0.25;
  const origin = Vector(w, h).multiply(0.5);
  const target = Vector(x, y).normalise().multiply(radius);

  context.clearRect(0, 0, w, h);

  const head = 10;
  const angle = Math.atan2(target.y, target.x);

  context.translate(origin.x, origin.y);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(target.x, target.y);

  const x1 = target.x - head * Math.cos(angle - thirty);
  const x2 = target.x - head * Math.cos(angle + thirty)
  const y1 = target.y - head * Math.sin(angle - thirty);
  const y2 = target.y - head * Math.sin(angle + thirty);

  context.lineTo(x1, y1);
  context.moveTo(target.x, target.y);
  context.lineTo(x2, y2);
  context.translate(-origin.x, -origin.y);
  context.stroke();

  const r = Math.min(0.5 * zoom * size - 4, Math.max(radius + 14, mousePos.mag()));

  context.beginPath();
  context.arc(origin.x, origin.y, r, 0, Math.PI * 2);
  context.closePath();
  context.stroke();

  // Repeat
  tick(draw);
};

window.addEventListener('resize', () => {
  center.x = window.innerWidth * 0.5;
  center.y = window.innerHeight * 0.5;
});

// Touchmove?
window.addEventListener('mousemove', (e) => {
  e.preventDefault();

  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('load', () => {
  tick(draw);
});

context.strokeStyle = '#fff';
context.strokeWidth = 2;

