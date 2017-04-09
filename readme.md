## Vector
> Super basic vector abstraction extracted from [evanw/lightgl.js](https://github.com/evanw/lightgl.js/blob/master/src/vector.js)

### Setup
```sh
npm install thewhodidthis/vector
```

### Usage
```js
import { Vector2d } from '@thewhodidthis/vector';

// Innards
Object.keys(Vector2d).forEach((k) => {
  console.log(k);
});
```

### Example
```js
import { Vector2d, createVector } from '@thewhodidthis/vector';

// Extend
const myVector = Object.assign({}, Vector2d, {
  min() {
    return Math.min(this.x, this.y);
  },
  max() {
    return Math.max(this.x, this.y);
  },
});

// Expand on
const fromAngle = a => createVector(Math.cos(a), Math.sin(a));
const rand = () => fromAngle(Math.random() * Math.PI * 2);
const lerp = (a, b, fraction) => b.subtract(a).multiply(fraction).add(a);
```
