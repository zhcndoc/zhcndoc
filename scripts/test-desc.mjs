import { createCanvas } from 'canvas'
import { prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext'

const canvas = createCanvas(800, 200)
const mockCtx = canvas.getContext('2d')

globalThis.OffscreenCanvas = class OffscreenCanvas {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
  getContext() {
    return mockCtx
  }
}

const font =
  '14px ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
const TARGET = 400

const text = process.argv[2]
if (!text) {
  console.log('Usage: node scripts/test-desc.mjs "description text"')
  process.exit(1)
}
const prepared = prepareWithSegments(text, font)
const width = measureNaturalWidth(prepared)
const rounded = Math.round(width * 100) / 100
const delta = Math.round(width - TARGET)
const mark = Math.abs(delta) <= 5 ? '✓' : Math.abs(delta) <= 10 ? '~' : '✗'
console.log(
  `${mark} ${rounded}px (delta: ${delta >= 0 ? '+' : ''}${delta})  ${text}`,
)
