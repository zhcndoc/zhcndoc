export const getTimeRange = (start?: string, end?: string) => {
  const today = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
  })
  return {
    startAt: new Date(start || today).setHours(0, 0, 0, 0),
    endAt: new Date(end || start || today).setHours(23, 59, 59, 999),
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
