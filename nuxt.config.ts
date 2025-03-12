import fs from 'fs'
import yaml from 'yaml'

if (!fs.existsSync('.nuxt')) fs.mkdirSync('.nuxt')
const projects = yaml.parse(fs.readFileSync('shared/projects.yaml', 'utf8'))
fs.writeFileSync('.nuxt/projects.json', JSON.stringify(projects, null, 2))

export default defineNuxtConfig({
  compatibilityDate: '2025-01-20',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui-pro', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],
  fonts: {
    provider: 'local',
    experimental: {
      processCSSVariables: true,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 1024,
    },
    customCollections: [
      {
        prefix: 'icon',
        dir: './app/assets/icons',
      },
    ],
  },
})
