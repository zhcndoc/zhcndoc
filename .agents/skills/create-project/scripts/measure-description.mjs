import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas } from 'canvas'
import { prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext'

const args = process.argv.slice(2)
const usage =
  'Usage: node .agents/skills/create-project/scripts/measure-description.mjs ["description text"]'

if (args.length > 1 || (args.length === 1 && !args[0].trim())) {
  console.error(usage)
  process.exit(1)
}

if (args[0] === '--help' || args[0] === '-h') {
  console.log(usage)
  console.log(
    'Omit the text to measure all descriptions in content/project/*.yml.',
  )
  process.exit(0)
}

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

function measureDescription(desc) {
  const prepared = prepareWithSegments(desc, font)
  const width = measureNaturalWidth(prepared)
  const delta = Math.round(width - TARGET)
  const mark = Math.abs(delta) <= 5 ? '✓' : Math.abs(delta) <= 10 ? '~' : '✗'
  return { desc, width: Math.round(width * 100) / 100, delta, mark }
}

if (args.length === 1) {
  const { desc, width, delta, mark } = measureDescription(args[0])
  console.log(
    `${mark} ${width}px (delta: ${delta >= 0 ? '+' : ''}${delta})  ${desc}`,
  )
} else {
  const dir = fileURLToPath(
    new URL('../../../../content/project/', import.meta.url),
  )
  const files = readdirSync(dir).filter((file) => file.endsWith('.yml'))
  const results = []

  for (const file of files) {
    const content = readFileSync(join(dir, file), 'utf-8')
    const match = content.match(/^description:\s*(.+)$/m)
    if (match) {
      results.push({
        name: file.replace('.yml', ''),
        ...measureDescription(match[1]),
      })
    }
  }

  results.sort((a, b) => a.width - b.width)

  const inRange = results.filter((result) => Math.abs(result.delta) <= 5).length
  const nearRange = results.filter(
    (result) => Math.abs(result.delta) <= 10,
  ).length
  console.log(
    `Target: ${TARGET}px  |  In range (±5): ${inRange}/${results.length}  |  In range (±10): ${nearRange}/${results.length}`,
  )
  console.log('─'.repeat(140))
  for (const result of results) {
    const deltaStr = result.delta >= 0 ? `+${result.delta}` : `${result.delta}`
    console.log(
      `${result.mark} ${result.name.padEnd(20)} ${result.width.toString().padStart(7)}px (${deltaStr.padStart(4)})  ${result.desc}`,
    )
  }
}
