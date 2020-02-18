'use strict'

const { equal } = require('tapeless')
const { createVector } = require('./')

const { x, y } = createVector(2)

equal
  .describe('x is a match')
  .test(x, 2)
  .describe('y is a match', 'will default')
  .test(y, 0)

const v1 = createVector(2)
const v2 = createVector(2)
const v3 = v1.add(v2)

equal
  .test(v3.x, 4)
  .describe(undefined, 'will add')
  .test(v3.y, 0)

const v4 = createVector(1, 1)
const v5 = v4.invert()

equal
  .test(v5.x, -1)
  .describe(undefined, 'will invert')
  .test(v5.y, -1)

const v6 = createVector(1, 1)
const v7 = v6.multiply(v6)
const v8 = v7.length()

equal
  .describe(undefined, 'will operate')
  .test(v8, Math.sqrt(v7.x + v7.y))
