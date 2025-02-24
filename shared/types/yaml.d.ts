interface Project {
  name: string
  translate: boolean
  upstream: {
    repo: string
    branch: string
  }
}

declare module '#shared/config.yaml' {
  const config: { projects: Project[] }
  export default config
}
