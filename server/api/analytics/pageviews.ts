import { z } from 'zod'

const { startAt, endAt } = getTimeRange()

const querySchema = z.object({
  host: z
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

  const unit = getUnitByTime(query.startAt, query.endAt)

  const data = await umami<AnalyticsPageviews>(
    `/websites/${UMAMI_WEBSITE_ID}/pageviews`,
    {
      query: {
        ...query,
        unit,
        timezone: 'Asia/Shanghai',
      },
    },
  )

  return data
})
