import { DateTime } from 'luxon'

export const getTimeRange = (start?: string, end?: string) => {
  const timeZone = 'Asia/Shanghai'
  const today = DateTime.local().setZone(timeZone).toFormat('yyyy-MM-dd')

  const startDate = DateTime.fromISO(start || today).setZone(timeZone)
  const endDate = DateTime.fromISO(end || start || today).setZone(timeZone)

  return {
    startAt: startDate.startOf('day').toMillis(),
    endAt: endDate.endOf('day').toMillis(),
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
