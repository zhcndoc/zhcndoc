import { DateTime } from 'luxon'

export const getTimeRange = (start?: string, end?: string) => {
  const timeZone = 'Asia/Shanghai'
  if (start && end) {
    const startDate = DateTime.fromISO(start).setZone(timeZone)
    const endDate = DateTime.fromISO(end).setZone(timeZone)

    return {
      startAt: startDate.startOf('day').toMillis(),
      endAt: endDate.endOf('day').toMillis(),
    }
  } else {
    const now = DateTime.local().setZone(timeZone)
    const twentyFourHoursAgo = now.minus({ hours: 23 })

    return {
      startAt: twentyFourHoursAgo.startOf('hour').toMillis(),
      endAt: now.endOf('hour').toMillis(),
    }
  }
}

export const getUnitByTime = (start: number, end: number) => {
  const diff = end - start
  if (diff <= 24 * 60 * 60 * 1000) {
    return 'hour'
  } else if (diff > 90 * 24 * 60 * 60 * 1000) {
    return 'month'
  } else {
    return 'day'
  }
}
