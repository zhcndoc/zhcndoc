import { z } from 'zod'

const { startAt, endAt } = getTimeRange()

const querySchema = z.object({
  startAt: z.coerce.number().default(startAt),
  endAt: z.coerce.number().default(endAt),
})

export default defineEventHandler(async (event) => {
  const { data: query, success } = await getValidatedQuery(event, (query) =>
    querySchema.safeParse(query),
  )

  if (!success) return

  const data = await umami(`/websites/${UMAMI_WEBSITE_ID}/stats`, {
    query,
  })

  return data
})
