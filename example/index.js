import { Vector3d as Vector, TAU } from '../index.es';

const thirty = TAU / 12;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const { width, height } = canvas;

const mouse = Vector();
const center = Vector(window.innerWidth, window.innerHeight).multiply(0.5);

const tick = (fn) => window.requestAnimationFrame(fn);
const draw = () => {
  const size = Math.max(canvas.offsetWidth, canvas.offsetHeight);
  const zoom = Math.max(width, height) / size;

  const mousePos = mouse.clone().subtract(center).multiply(zoom);
  const { x, y } = mousePos;

  const radius = zoom * size * 0.25;
  const origin = Vector(width, height).multiply(0.5);
  const target = Vector(x, y).normalise().multiply(radius);

  context.clearRect(0, 0, width, height);

  const head = 10;
  const angle = Math.atan2(target.y, target.x);

  context.translate(origin.x, origin.y);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(target.x, target.y);

  const a1 = angle - thirty;
  const a2 = angle + thirty;
  const x1 = target.x - head * Math.cos(a1);
  const x2 = target.x - head * Math.cos(a2)
  const y1 = target.y - head * Math.sin(a1);
  const y2 = target.y - head * Math.sin(a2);

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

