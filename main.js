export class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  angle() {
    return Math.atan2(this.y, this.x)
  }
  length() {
    return Math.hypot(this.x, this.y)
  }
  dot(q = {}) {
    const { x = q, y = q } = q

    return (this.x * x) + (this.y * y)
  }
  add(q = {}) {
    const { x = q, y = q } = q

    return vector(this.x + x, this.y + y)
  }
  subtract(q = {}) {
    const { x = q, y = q } = q

    return vector(this.x - x, this.y - y)
  }
  multiply(q = {}) {
    const { x = q, y = q } = q

    return vector(this.x * x, this.y * y)
  }
  divide(q = {}) {
    const { x = q, y = q } = q

    return vector(this.x / x, this.y / y)
  }
  plus(q) {
    return this.copy(this.add(q))
  }
  minus(q) {
    return this.copy(this.subtract(q))
  }
  times(q) {
    return this.copy(this.multiply(q))
  }
  over(q) {
    return this.copy(this.divide(q))
  }
  copy(q = {}) {
    const { x = q, y = q } = q

    this.x = x
    this.y = y

    return this
  }
  clone() {
    return vector(this.x, this.y)
  }
  equals(v) {
    return this.x === v.x && this.y === v.y
  }
  invert() {
    return this.times(-1)
  }
  normalize() {
    return this.over(this.length())
  }
}

export function vector(x, y) {
  return new Vector(x, y)
}
