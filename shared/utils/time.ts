import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getTimeRange = (start?: string, end?: string) => {
  const today = dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD')

  return {
    startAt: dayjs(start || today)
      .tz('Asia/Shanghai')
      .startOf('day')
      .valueOf(),
    endAt: dayjs(end || start || today)
      .tz('Asia/Shanghai')
      .endOf('day')
      .valueOf(),
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
