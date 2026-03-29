import { z } from 'zod'
import { getTimeRange } from '#shared/utils/time'

const { startAt, endAt } = getTimeRange()

const querySchema = z.object({
  hostname: z
    .string()
    .transform((val) => (val === 'www.zhcndoc.com' ? undefined : val))
    .optional(),
  startAt: z.coerce.number().default(startAt),
  endAt: z.coerce.number().default(endAt),
})

// Umami 返回的是 UTC 数据，手动将其旋转为 Asia/Shanghai（UTC+8）
function convertToShanghai(utcData: number[][]): number[][] {
  const result: number[][] = Array.from({ length: 7 }, () =>
    new Array<number>(24).fill(0),
  )
  const offset = 8
  for (let day = 0; day < 7; day++) {
    const row = utcData[day]
    if (!row) continue
    for (let hour = 0; hour < 24; hour++) {
      const count = row[hour] ?? 0
      if (count === 0) continue
      const newHour = (hour + offset) % 24
      const dayShift = Math.floor((hour + offset) / 24)
      const newDay = (day + dayShift) % 7
      const targetRow = result[newDay]
      if (targetRow) targetRow[newHour] = (targetRow[newHour] ?? 0) + count
    }
  }
  return result
}

export default defineEventHandler(async (event) => {
  const { data: query, success } = await getValidatedQuery(
    event,
    querySchema.safeParse,
  )

  if (!success) return

  const utcData = await umami<number[][]>(
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

  return convertToShanghai(utcData)
})
