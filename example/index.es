import { createVector } from '../index.mjs'

const canvas = document.querySelector('canvas')
const target = canvas.getContext('2d')

const { width: w, height: h } = canvas

const peak = (h * h) + (w * w)
const cell = 20

// Gridlines
const guides = canvas.cloneNode().getContext('2d')

for (let i = 1, s = w / cell; i < s; i += 1) {
  const x = (i * cell) + 0.5

  guides.moveTo(x, 0)
  guides.lineTo(x, h)
}

for (let j = 1, t = h / cell; j < t; j += 1) {
  const y = (j * cell) + 0.5

  guides.moveTo(0, y)
  guides.lineTo(w, y)
}

guides.stroke()

const colors = ['#fff', '#000', '#ff0', '#f0f', '#f00', '#0f0', '#0ff', '#00f']

const needle = createVector()
const center = createVector(window.innerWidth, window.innerHeight).multiply(0.5)
const offset = createVector(w, h).multiply(0.5)

const lookup = Array.from({ length: (w * h) / (cell * cell) }).map((v, i) => {
  const s = i * cell
  const x = s % w
  const y = cell * Math.floor(s / w)

  return createVector(x, y)
})

const random = n => Math.floor(Math.random() * n)

const points = Array.from({ length: colors.length }).map(() => {
  const v = createVector()

  v.x = random(w)
  v.y = random(h)

  return v
})

const tick = fn => window.requestAnimationFrame(fn)
const stop = id => window.cancelAnimationFrame(id)

let beat

const draw = () => {
  const marker = needle.clone().subtract(center).add(offset)
  const master = points[0]

  master.copy(marker)

  // Voronoi loop adapted from
  // https://rosettacode.org/wiki/Voronoi_diagram#JavaScript
  lookup.forEach((p) => {
    let tip = peak
    let c = 0

    points.forEach((spot, n) => {
      const copy = spot.clone()
      const dist = copy.subtract(p).dot(copy)

      if (dist < tip) {
        tip = dist
        c = n
      }
    })

    target.fillStyle = colors[c]
    target.fillRect(p.x, p.y, cell, cell)
  })

  target.drawImage(guides.canvas, 0, 0)

  if (beat) {
    beat = stop(beat)
  }
}

const play = () => {
  if (!beat) {
    beat = tick(draw)
  }
}

const move = (e) => {
  e.preventDefault()

  needle.x = e.pageX || (e.touches && e.touches[0].pageX)
  needle.y = e.pageY || (e.touches && e.touches[0].pageY)

  play()
}

['mousemove', 'touchmove', 'touchstart'].forEach((e) => {
  document.addEventListener(e, move)
})

const html = document.documentElement

window.addEventListener('resize', () => {
  const x = Math.max(window.innerWidth, html.clientWidth)
  const y = Math.max(window.innerHeight, html.clientHeight)

  center.copy({ x, y }).multiply(0.5)
})

window.addEventListener('load', play)
