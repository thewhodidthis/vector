import { createVector as vector2d } from '../index.mjs'

// Instead of cloning all the time
const vectorFrom = v => vector2d(v.x, v.y)

// Prepare grid points array
const createGrid = v => Array.from({ length: v.x * v.y })
  .map((p, i) => vector2d(i % v.x, Math.floor(i / v.x)))

const canvas = document.querySelector('canvas')
const master = canvas.getContext('2d')

// Mouse position
const needle = vector2d()

// Window size
const father = vector2d(window.innerWidth, window.innerHeight)

// Canvas dimensions
const figure = vector2d(canvas.width, canvas.height)

// Canvas mid
const origin = figure.clone().multiply(0.5)

// Canvas bounding rect
const offset = vector2d(canvas.offsetWidth, canvas.offsetHeight)

// Grid stuff
const cellMag = 25
const cellMid = cellMag * 0.5
const cellN = figure.clone().divide(cellMag)

const grid = createGrid(cellN).map(p => p.multiply(cellMag).add(cellMid))
const gridFromOrigin = grid.map(p => vectorFrom(p).subtract(origin))

// Draw gridlines
const guides = canvas.cloneNode().getContext('2d')

for (let i = 0; i < figure.x; i += cellMag) {
  const x = i - 0.5

  guides.moveTo(x, 0)
  guides.lineTo(x, figure.y)
}

for (let i = 0; i < figure.y; i += cellMag) {
  const y = i - 0.5

  guides.moveTo(0, y)
  guides.lineTo(figure.x, y)
}

guides.fillStyle = '#eee'
guides.fillRect(0, 0, figure.x, figure.y)
guides.strokeStyle = '#ddd'
guides.stroke()

// Prerender mother shape
const cursor = document.createElement('canvas').getContext('2d')

// Save on space
Object.assign(cursor.canvas, { width: figure.x, height: figure.y })

// Prerender mother shape
cursor.beginPath()
cursor.moveTo(cellMag * 0.625, cellMag * 0.375)
cursor.lineTo(cellMag * 0.75, cellMid)
cursor.lineTo(cellMag * 0.625, cellMag * 0.625)
cursor.moveTo(cellMag * 0.25, cellMid)
cursor.lineTo(cellMag * 0.75, cellMid)
cursor.lineCap = 'square'
cursor.lineWidth = 1.5
cursor.stroke()

master.fillStyle = master.createPattern(cursor.canvas, 'no-repeat')

let frames

const tick = fn => window.requestAnimationFrame(fn)
const stop = id => window.cancelAnimationFrame(id)

const draw = () => {
  const center = father.clone().multiply(0.5)
  const correction = figure.clone().divide(offset)

  master.drawImage(guides.canvas, 0, 0)

  grid.forEach((p, i) => {
    const point = gridFromOrigin[i]
    const angle = vectorFrom(needle)
      .subtract(center)
      .multiply(correction)
      .subtract(point)
      .angle()

    master.save()
    master.translate(p.x, p.y)
    master.rotate(angle)
    master.translate(-cellMid, -cellMid)
    master.fillRect(0, 0, cellMag, cellMag)
    master.restore()
  })

  if (frames) {
    frames = stop(frames)
  }
}

const play = () => {
  if (!frames) {
    frames = tick(draw)
  }
}

const move = (e) => {
  needle.x = e.pageX || (e.touches && e.touches[0].pageX)
  needle.y = e.pageY || (e.touches && e.touches[0].pageY)

  play()
}

['mousemove', 'touchmove', 'touchstart'].forEach((e) => {
  document.addEventListener(e, move)
})

window.addEventListener('resize', () => {
  const { clientWidth, clientHeight } = document.documentElement

  father.x = Math.max(window.innerWidth, clientWidth)
  father.y = Math.max(window.innerHeight, clientHeight)

  offset.x = canvas.offsetWidth
  offset.y = canvas.offsetHeight
})

window.addEventListener('load', play)
