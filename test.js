'use strict'

const { equal } = require('tapeless')
const { createVector } = require('./')

const { x, y } = createVector(2)

equal(x, 2, 'x is a match', 'will default')
equal(y, 0, 'y is a match')

const v1 = createVector(2)
const v2 = createVector(2)
const v3 = v1.add(v2)

equal(v3.x, 4, undefined, 'will add')
equal(v3.y, 0)

const v4 = createVector(1, 1)
const v5 = v4.invert()

equal(v5.x, -1, undefined, 'will invert')
equal(v5.y, -1)

const v6 = createVector(1, 1)
const v7 = v6.multiply(v6)
const v8 = v7.length()

equal(v8, Math.sqrt(v7.x + v7.y), undefined, 'will operate')
