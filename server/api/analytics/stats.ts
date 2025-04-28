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
  const { data: query, success } = await getValidatedQuery(event, (query) =>
    querySchema.safeParse(query),
  )

  if (!success) return

  const data = await umami<AnalyticsStats>(
    `/websites/${UMAMI_WEBSITE_ID}/stats`,
    {
      query,
    },
  )

  return data
})
