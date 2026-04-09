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

const font = '14px ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
const TARGET = 400

const proposals = {
  'nuxt-examples': 'Nuxt 全栈框架的实用示例集合，涵盖多种场景的配置与实践。',
  'nuxt-docs': 'Nuxt 全栈框架使用指南，涵盖配置、路由和 API 参考内容。',
  'nuxt-color-mode': 'Nuxt 生态主题模式管理模块，支持亮色、暗色和系统偏好配色。',
  'hono': '轻量快速的多运行时 Web 框架，适合构建边缘和服务端应用程序。',
  'iconify': '统一的开源图标框架，聚合数十万图标并提供多框架组件和工具。',
  'react': '声明式 UI 构建库，专注组件化开发模式，构建丰富的用户界面。',
  'typeorm': 'TypeScript ORM 框架，提供类型安全的实体映射与完整查询构建。',
  'sharp': '高性能 Node.js 图片处理库，支持裁剪、缩放、旋转和格式转换。',
  'unocss': '灵活可定制的即时原子 CSS 引擎，支持多种预设及按需编译能力。',
  'astro': '内容驱动的现代 Web 框架，支持多种 UI 库，专注构建高速网站。',
  'nuxt-mcp-toolkit': 'Nuxt 的 MCP 协议工具模块，用于搭建 AI 工具、资源和提示词。',
  'markdoc': '基于 Markdown 的内容创作工具链，构建结构化且可扩展的内容。',
  'nuxt-scripts': 'Nuxt 生态的脚本管理模块，简化第三方脚本加载与页面性能优化。',
  'tailwindcss': '实用优先的原子 CSS 框架，提供灵活样式组合和高效开发体验。',
  'lucide': '开源 SVG 图标库，提供统一设计风格的多框架图标组件和工具。',
  'shiki': '基于 VS Code 语法高亮的代码着色库，覆盖多种主题和编程语言。',
  'opennext': '开源适配层框架，帮助 Next.js 应用部署到各种云和自托管环境。',
  'nitro': '通用服务端引擎框架，支持多种运行环境部署，驱动 Nuxt 后端。',
  'shadcn': '基于 Radix UI 的 React UI 组件集合，提供简洁可复用的界面设计。',
  'nuxt': '基于 Vue.js 的全栈框架，支持服务端渲染和多种页面生成能力。',
  'vitepress': '基于 Vite 的 Markdown 静态页面生成器，适用于技术内容编写。',
  'node': '基于 V8 引擎的 JavaScript 运行时环境，适合构建高性能后端应用。',
  'openclaw': '可本地运行的个人 AI 助手平台，支持多渠道接入和任务自动化。',
  'elysia': '基于 Bun 的高性能 TypeScript 后端框架，提供极致的开发体验。',
  'umami': '轻量开源且注重隐私的网站分析工具，可简单灵活地自托管部署。',
  'drizzle': '轻量级 TypeScript ORM，提供类 SQL 语法与完备的类型安全。',
  'nuxt-content': '基于 Git 的 Nuxt 内容管理模块，提供简洁方式组织和管理内容。',
  'better-auth': '面向 Web 的身份认证框架，提供开箱即用的账号体系与插件扩展。',
  'redux': '单向数据流的状态管理库，有效解耦组件通信，适配复杂应用开发。',
  'blocknote': '面向 React 的块级富文本编辑器，以最小配置即可提供出色体验。',
  'radix': '高可访问、可组合的 React UI 组件库，专注交互和无障碍体验。',
  'vueuse': '基于 Vue 组合式 API 的实用工具库，提供丰富的组合式函数。',
  'tiptap': '可扩展的富文本编辑器框架，支持实时协作编辑与 AI 辅助集成。',
  'onlook': '面向设计师的可视化开发工具，浏览器内实时编辑并同步至代码。',
  'zod': 'TypeScript 优先的数据验证库，提供类型安全模式验证与解析。',
  'next-intl': '面向 Next.js 的国际化方案，支持多语言路由与丰富格式化能力。',
}

const results = []
for (const [name, desc] of Object.entries(proposals)) {
  const prepared = prepareWithSegments(desc, font)
  const width = measureNaturalWidth(prepared)
  const rounded = Math.round(width * 100) / 100
  const delta = Math.round(width - TARGET)
  const ok = Math.abs(delta) <= 5
  const mark = ok ? '✓' : Math.abs(delta) <= 10 ? '~' : '✗'
  results.push({ name, desc, width: rounded, delta, mark })
}

results.sort((a, b) => a.width - b.width)
let inRange = results.filter(r => Math.abs(r.delta) <= 5).length
console.log(`In range (±5): ${inRange}/${results.length}`)
console.log('─'.repeat(120))
for (const r of results) {
  const deltaStr = r.delta >= 0 ? `+${r.delta}` : `${r.delta}`
  console.log(`${r.mark} ${r.name.padEnd(20)} ${r.width.toString().padStart(7)}px (${deltaStr.padStart(4)})  ${r.desc}`)
}
