import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.yml',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        type: z.enum(['mirror', 'translate']),
        upstream: z.object({
          owner: z.string(),
          repo: z.string(),
          branch: z.string(),
          link: z.string(),
        }),
      }),
    }),
  },
})
