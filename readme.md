## about

Meant for extending, a simple 2d vector abstraction to aid working with the equations of motion in canvas animations. 

## setup

Fetch the latest version from GitHub directly:

```sh
# Includes ES and CJS modules
npm install thewhodidthis/vector
```

## usage

Includes a mixin friendly object literal with _x_, _y_ properties and a basic set of algebraic methods attached such as _add_, _subtract_, _multiply_, and a few others. A corresponding factory function is also available. For example,

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

## see also

- [Nature of Code, Ch. 1](https://natureofcode.com/book/chapter-1-vectors/)
- [p5.Vector](https://p5js.org/reference/#/p5.Vector)
- [evanw/lightgl.js](https://github.com/evanw/lightgl.js/blob/master/src/vector.js)
