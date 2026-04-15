import { z } from 'zod'
import { getTimeRange } from '#shared/utils/time'
import type { AnalyticsStats } from '#shared/types/analytics'

const { startAt, endAt } = getTimeRange()

const querySchema = z.object({
  hostname: z
    .string()
    .transform((val) => (val === 'www.zhcndoc.com' ? undefined : val))
    .optional(),
  startAt: z.coerce.number().default(startAt),
  endAt: z.coerce.number().default(endAt),
})

export default defineEventHandler(async (event) => {
  const { data: query, success } = await getValidatedQuery(
    event,
    querySchema.safeParse,
  )

  if (!success) return

  const data = await umami<AnalyticsStats>(
    `/websites/${UMAMI_WEBSITE_ID}/stats`,
    {
      query,
    },
  )

  return {
    pageviews: Number(data?.pageviews ?? 0),
    visits: Number(data?.visits ?? 0),
    visitors: Number(data?.visitors ?? 0),
    bounces: Number(data?.bounces ?? 0),
    totaltime: Number(data?.totaltime ?? 0),
    comparison: {
      pageviews: Number(data?.comparison?.pageviews ?? 0),
      visits: Number(data?.comparison?.visits ?? 0),
      visitors: Number(data?.comparison?.visitors ?? 0),
      bounces: Number(data?.comparison?.bounces ?? 0),
      totaltime: Number(data?.comparison?.totaltime ?? 0),
    },
  } satisfies AnalyticsStats
})
