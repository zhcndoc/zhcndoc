import { z } from 'zod'

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

  const data = await umami<number[][]>(
    `/websites/${UMAMI_WEBSITE_ID}/sessions/weekly`,
    {
      query: {
        startAt: query.startAt,
        endAt: query.endAt,
        timezone: 'Asia/Shanghai',
        ...(query.hostname && { hostname: query.hostname }),
      },
    },
  )

  return data
})
