import { DateTime } from 'luxon'
import type { AnalyticsDateRange } from '#shared/types/analytics'

interface UmamiDateRange {
  startDate?: string | null
  endDate?: string | null
}

export default defineEventHandler(async (): Promise<AnalyticsDateRange | null> => {
  const data = await umami<UmamiDateRange>(
    `/websites/${UMAMI_WEBSITE_ID}/daterange`,
  )

  if (!data?.startDate || !data?.endDate) return null

  const start = DateTime.fromISO(data.startDate).setZone('Asia/Shanghai')
  const end = DateTime.fromISO(data.endDate).setZone('Asia/Shanghai')

  if (!start.isValid || !end.isValid) return null

  return {
    startAt: start.startOf('day').toMillis(),
    endAt: end.endOf('day').toMillis(),
  }
})
