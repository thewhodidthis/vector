## Vector
> Super basic vector abstraction extracted from [evanw/lightgl.js](https://github.com/evanw/lightgl.js/blob/master/src/vector.js)

### Setup
```sh
npm install thewhodidthis/vector
```

### Usage
```js
const vector = require('@thewhodidthis/vector').Vector3d;

// Innards
Object.keys(vector).forEach((k) => {
  console.log(k);
});
```

### Example
```js
import { Vector3d } from '@thewhodidthis/vector';

// Extend
const myVector = Object.assign(Vector3d, {
  min() {
    return Math.min(Math.min(this.x, this.y), this.z);
  },
  max() {
    return Math.max(Math.max(this.x, this.y), this.z);
  },
});
```
