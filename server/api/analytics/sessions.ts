import { z } from 'zod'

const { startAt, endAt } = getTimeRange()

const querySchema = z.object({
  hostname: z
    .string()
    .transform((val) => (val === 'www.zhcndoc.com' ? undefined : val))
    .optional(),
  startAt: z.coerce.number().default(startAt),
  endAt: z.coerce.number().default(endAt),
  page: z.coerce.number().positive().default(1),
  pageSize: z.coerce.number().positive().max(100).default(20),
  search: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const { data: query, success } = await getValidatedQuery(
    event,
    querySchema.safeParse,
  )

  if (!success) return

  const data = await umami<AnalyticsSessionsResponse>(
    `/websites/${UMAMI_WEBSITE_ID}/sessions`,
    {
      query,
    },
  )

  return data
})
