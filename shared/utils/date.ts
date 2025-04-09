export const getTodayTimeRange = () => {
  const today = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
  })
  return {
    startAt: new Date(today).setHours(0, 0, 0, 0),
    endAt: new Date(today).setHours(23, 59, 59, 999),
  }
}

export const getUnitByTime = (startAt: number, endAt: number) => {
  const diff = endAt - startAt
  if (diff <= 24 * 60 * 60 * 1000) {
    return 'hour'
  } else if (diff > 90 * 24 * 60 * 60 * 1000) {
    return 'month'
  } else {
    return 'day'
  }
}
