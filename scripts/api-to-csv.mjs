import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function fetchAndConvert() {
  try {
    const response = await fetch('https://www.zhcndoc.com/api/projects')
    const data = await response.json()

    data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    const headers = [
      '项目名',
      '标题',
      '描述',
      '类型',
      '上游网站',
      'GitHub 仓库',
      '中文站点',
      '许可证',
      '创建时间',
    ]

    const csvRows = [headers.join(',')]

    for (const item of data) {
      const githubUrl =
        item.upstream?.owner && item.upstream?.repo
          ? `https://github.com/${item.upstream.owner}/${item.upstream.repo}`
          : ''
      const row = [
        escapeCsv(item.name),
        escapeCsv(item.title),
        escapeCsv(item.description),
        escapeCsv(item.type),
        escapeCsv(item.upstream?.link || ''),
        escapeCsv(githubUrl),
        escapeCsv(item.link),
        escapeCsv(item.license),
        escapeCsv(formatDate(item.createdAt)),
      ]
      csvRows.push(row.join(','))
    }

    const csvContent = csvRows.join('\n')
    const outputPath = path.join(__dirname, '..', 'projects.csv')
    fs.writeFileSync(outputPath, '\uFEFF' + csvContent, 'utf-8')

    console.log(`CSV file saved to: ${outputPath}`)
    console.log(`Total projects: ${data.length}`)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

function formatDate(iso) {
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function escapeCsv(value) {
  if (value === null || value === undefined) {
    return ''
  }
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

fetchAndConvert()
