## about

Super basic vector abstraction based on [evanw/lightgl.js](https://github.com/evanw/lightgl.js/blob/master/src/vector.js).

## setup

Fetch latest from GitHub directly:

```sh
npm install thewhodidthis/vector
```

## usage

A mixin friendly object and corresponding factory function are available. For example,

```js
import { Vector2d, createVector } from '@thewhodidthis/vector'

// Show built-in methods
Object.keys(Vector2d).forEach(function inspect(k) {
  console.log(k)
})

// Extend
const myVector = Object.assign({}, Vector2d, {
  get w() {
    return this.x
  },
  get h() {
    return this.y
  },
  min() {
    return Math.min(this.x, this.y)
  },
  max() {
    return Math.max(this.x, this.y)
  }
})

// Expand on
const fromAngle = a => createVector(Math.cos(a), Math.sin(a))
const rand = () => fromAngle(Math.random() * Math.PI * 2)
const lerp = (a, b, fraction) => b.subtract(a).multiply(fraction).add(a)
```
