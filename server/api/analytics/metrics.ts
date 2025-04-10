import { z } from 'zod'

const { startAt, endAt } = getTimeRange()

const querySchema = z.object({
  type: z
    .enum([
      'url',
      'referrer',
      'title',
      'query',
      'host',
      'os',
      'browser',
      'device',
      'country',
      'region',
      'city',
      'language',
      'event',
    ])
    .default('host'),
  startAt: z.number().default(startAt),
  endAt: z.number().default(endAt),
  limit: z.number().positive().default(10),
})

export default defineEventHandler(async (event) => {
  const { data: query, success } = await getValidatedQuery(event, (query) =>
    querySchema.safeParse(query),
  )

  if (!success) return

  const { data } = await umami.getWebsiteMetrics(
    'f0e90b0d-e086-4fdc-b173-de4857b71900',
    query,
  )

  return data
})
