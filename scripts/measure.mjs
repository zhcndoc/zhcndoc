import { createCanvas } from 'canvas'
import { join } from 'path'
import { prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext'
import { readFileSync, readdirSync } from 'fs'

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

const font = '14px ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
const TARGET = 400

const dir = 'content/projects'
const files = readdirSync(dir).filter((f) => f.endsWith('.yml'))
const descriptions = {}

for (const f of files) {
  const content = readFileSync(join(dir, f), 'utf-8')
  const match = content.match(/^description:\s*(.+)$/m)
  if (match) {
    descriptions[f.replace('.yml', '')] = match[1]
  }
}

const results = []
let inRange = 0
for (const [name, desc] of Object.entries(descriptions)) {
  const prepared = prepareWithSegments(desc, font)
  const width = measureNaturalWidth(prepared)
  const rounded = Math.round(width * 100) / 100
  const delta = Math.round(width - TARGET)
  const ok = Math.abs(delta) <= 5
  if (ok) inRange++
  results.push({ name, desc, width: rounded, delta, ok })
}

results.sort((a, b) => a.width - b.width)

console.log(
  `Target: ${TARGET}px  |  In range (±5): ${inRange}/${results.length}  |  In range (±10): ${results.filter((r) => Math.abs(r.delta) <= 10).length}/${results.length}`,
)
console.log('─'.repeat(140))
for (const r of results) {
  const mark =
    Math.abs(r.delta) <= 5 ? '✓' : Math.abs(r.delta) <= 10 ? '~' : '✗'
  const deltaStr = r.delta >= 0 ? `+${r.delta}` : `${r.delta}`
  console.log(
    `${mark} ${r.name.padEnd(20)} ${r.width.toString().padStart(7)}px (${deltaStr.padStart(4)})  ${r.desc}`,
  )
}
