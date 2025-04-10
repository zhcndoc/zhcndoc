import { z } from 'zod'

const { startAt, endAt } = getTimeRange()

const querySchema = z.object({
  startAt: z.number().default(startAt),
  endAt: z.number().default(endAt),
})

export default defineEventHandler(async (event) => {
  const { data: query, success } = await getValidatedQuery(event, (query) =>
    querySchema.safeParse(query),
  )

  if (!success) return

  const { data } = await umami.getWebsiteStats(
    'f0e90b0d-e086-4fdc-b173-de4857b71900',
    query,
  )

  return data
})
