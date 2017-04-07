const test = require('tape');
const Vector = require('../').createVector;

test('will default', (t) => {
  const { x, y, z } = Vector(2);

  t.equals(x, 2);
  t.equals(y, 0);
  t.equals(z, 0);
  t.end();
});

test('will add', (t) => {
  const v1 = Vector(2);
  const v2 = Vector(2);
  const { x, y, z } = v1.add(v2);

  t.equals(x, 4);
  t.equals(y, 0);
  t.equals(z, 0);
  t.end();
});

test('will invert', (t) => {
  const v1 = Vector(1, 1, 1);
  const { x, y, z } = v1.invert();

  t.equals(x, -1);
  t.equals(y, -1);
  t.equals(z, -1);
  t.end();
});

