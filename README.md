## about

Meant for extending, a simple 2d vector abstraction to aid working with the equations of motion in canvas animations.

## setup

Load via script tag:

```html
<!-- Just an IIFE namespaced `vector` -->
<script src="https://thewhodidthis.github.io/vector/vector.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "@thewhodidthis/vector": "https://thewhodidthis.github.io/vector/main.js"
  }
}
```

Download from GitHub directly if using a package manager:

```sh
# Add to package.json
npm install thewhodidthis/vector
```

## usage

Includes a class based definition with _x_, _y_ properties and a basic set of helper methods attached such as _add_, _subtract_, _multiply_, _divide_, _copy_, _clone_, etc. A corresponding factory function is also available. For example,

```js
import { vector, Vector } from "@thewhodidthis/vector"

// Show built-in methods.
console.log(Object.getOwnPropertyNames(Vector.prototype))

// Extend.
class Hector extends Vector {
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
  },
}

// Expand.
const fromAngle = a => vector(Math.cos(a), Math.sin(a))
const rand = () => fromAngle(Math.random() * Math.PI * 2)
const lerp = (a, b, fraction) => b.minus(a).times(fraction).plus(a)
```

## see also

- [Nature of Code, Ch. 1](https://natureofcode.com/book/chapter-1-vectors/)
- [p5.Vector](https://p5js.org/reference/#/p5.Vector)
- [@evanw/lightgl.js](https://github.com/evanw/lightgl.js/blob/master/src/vector.js)
