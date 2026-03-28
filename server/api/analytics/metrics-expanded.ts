import { z } from 'zod'
import { getTimeRange } from '#shared/utils/time'
import type { AnalyticsMetricExpanded } from '#shared/types/analytics'

const { startAt, endAt } = getTimeRange()

const querySchema = z.object({
  type: z
    .enum([
      'path',
      'entry',
      'exit',
      'referrer',
      'title',
      'query',
      'channel',
      'domain',
      'os',
      'browser',
      'device',
      'screen',
      'country',
      'region',
      'city',
      'language',
      'event',
      'hostname',
      'tag',
      'distinctId',
    ])
    .default('hostname'),
  hostname: z
    .string()
    .transform((val) => (val === 'www.zhcndoc.com' ? undefined : val))
    .optional(),
  startAt: z.coerce.number().default(startAt),
  endAt: z.coerce.number().default(endAt),
  limit: z.coerce.number().positive().default(10),
  offset: z.coerce.number().nonnegative().default(0),
})

export default defineEventHandler(async (event) => {
  const { data: query, success } = await getValidatedQuery(
    event,
    querySchema.safeParse,
  )

  if (!success) return

  const data = await umami<AnalyticsMetricExpanded[]>(
    `/websites/${UMAMI_WEBSITE_ID}/metrics/expanded`,
    {
      query: {
        ...query,
        timezone: 'Asia/Shanghai',
      },
    },
  )

  return data
})
