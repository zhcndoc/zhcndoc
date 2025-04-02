import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    app: defineCollection({
      type: 'data',
      source: 'app.yml',
      schema: z.object({
        projects: z.array(
          z.object({
            name: z.string(),
            type: z.string(),
            upstream: z.object({
              owner: z.string(),
              repo: z.string(),
              branch: z.string(),
            }),
          }),
        ),
      }),
    }),
  },
})
