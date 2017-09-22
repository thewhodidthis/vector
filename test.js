'use strict'

const test = require('tape')
const { createVector } = require('./')

test('will default', (t) => {
  const { x, y } = createVector(2)

  t.equals(x, 2)
  t.equals(y, 0)
  t.end()
})

test('will add', (t) => {
  const v1 = createVector(2)
  const v2 = createVector(2)
  const { x, y } = v1.add(v2)

  t.equals(x, 4)
  t.equals(y, 0)
  t.end()
})

test('will invert', (t) => {
  const v1 = createVector(1, 1)
  const { x, y } = v1.invert()

  t.equals(x, -1)
  t.equals(y, -1)
  t.end()
})

test('will operate', (t) => {
  const v1 = createVector(1, 1)
  const v2 = v1.multiply(v1)
  const v3 = v2.mag()

  t.equals(v3, Math.sqrt(v2.x + v2.y))
  t.end()
})
