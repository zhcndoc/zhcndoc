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
    posts: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        image: z
          .object({
            src: z.string(),
            alt: z.string().optional(),
          })
          .optional(),
        authors: z
          .array(
            z.object({
              name: z.string(),
              avatar: z.object({ src: z.string() }),
              to: z.string().optional(),
            }),
          )
          .optional(),
        badge: z
          .object({
            label: z.string(),
          })
          .optional(),
      }),
    }),
  },
})
