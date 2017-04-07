import { createVector as Vector, TAU } from '../index.es';

const thirty = TAU / 12;

const createContext = (width, h) => Object.assign(document.createElement('canvas'), {
  width,
  height: width || h
}).getContext('2d');

const createPoints = (c = 0, n = 3) => Array.from({ length: n }).map((point, i) => {
  const a = (i * TAU) / n;
  const x = c * Math.cos(a);
  const y = c * Math.sin(a);

  return { x, y };
});

const createTip = (size = 100, a = 0, s = 1) => {
  const center = size * 0.5;
  const points = createPoints(center);
  const output = createContext(size);

  output.save();
  output.translate(center, center);
  output.rotate(a);
  output.scale(s, s);

  output.beginPath();

  points.forEach((p) => {
    output.lineTo(p.x, p.y);
  });

  output.closePath();
  output.restore();
  output.fill();

  return output;
};

const context = document.getElementById('canvas').getContext('2d');
const { width, height } = context.canvas;

const center = Vector(window.innerWidth, window.innerHeight).multiply(0.5);
const origin = Vector(width, height).multiply(0.5);

const mouse = Vector();

const tick = (fn) => window.requestAnimationFrame(fn);
const draw = () => {
  const size = Math.max(context.canvas.offsetWidth, context.canvas.offsetHeight);
  const zoom = Math.max(width, height) / size;
  const stop = zoom * size * 0.25;
  const tips = createPoints((size * 0.5) - 20, 20);

  const mousePos = mouse.clone().subtract(center).multiply(zoom);
  const { x, y } = mousePos;

  const carto = Vector(x, y).normalise().multiply(stop);
  const angle = Math.atan2(carto.y, carto.x);

  context.clearRect(0, 0, width, height);
  context.save();
  context.translate(origin.x, origin.y);
  context.rotate(angle);
  context.translate(-origin.x, -origin.y);

  tips.forEach((pos, i) => {
    const { canvas } = createTip(20, pos);
    const l = origin.x + pos.x - 10;
    const t = origin.y + pos.y - 10;

    context.drawImage(canvas, l, t);
  });

  context.restore();

  tick(draw);
};

window.addEventListener('resize', () => {
  center.x = window.innerWidth * 0.5;
  center.y = window.innerHeight * 0.5;
});

// Where is touchmove handler?
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('load', () => {
  tick(draw);
});

