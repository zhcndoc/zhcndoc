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
  const { data: query, success } = await getValidatedQuery(
    event,
    querySchema.safeParse,
  )

  if (!success) return

  const data = await umami<AnalyticsMetric[]>(
    `/websites/${UMAMI_WEBSITE_ID}/metrics`,
    {
      query: {
        ...query,
        timezone: 'Asia/Shanghai',
      },
    },
  )

  return data
})
