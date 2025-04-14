export function formatLongNumber(value: number) {
  const n = Number(value)
  if (n >= 1e8) {
    return `${(n / 1e8).toFixed(1)} 亿`
  } else if (n >= 1e4) {
    return `${(n / 1e4).toFixed(1)} 万`
  } else {
    return n.toFixed(0)
  }
}

export function formatSeconds(seconds: number) {
  const SECONDS_IN_MINUTE = 60
  const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE
  const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR
  const SECONDS_IN_MONTH = 30 * SECONDS_IN_DAY
  const SECONDS_IN_YEAR = 365 * SECONDS_IN_DAY

  const timeUnits = [
    { unit: '年', value: SECONDS_IN_YEAR },
    { unit: '月', value: SECONDS_IN_MONTH },
    { unit: '天', value: SECONDS_IN_DAY },
    { unit: '时', value: SECONDS_IN_HOUR },
    { unit: '分', value: SECONDS_IN_MINUTE },
    { unit: '秒', value: 1 },
  ]
  let result = ''
  for (const { unit, value } of timeUnits) {
    const amount = Math.floor(seconds / value)
    if (amount) {
      result += ` ${amount} ${unit}`
      seconds %= value
    }
  }
  return result.trim() || '0 秒'
}
