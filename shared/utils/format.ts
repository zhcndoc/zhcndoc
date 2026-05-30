export function formatLongNumber(value: number) {
  const n = Number(value)
  if (n >= 1e8) {
    return `${(n / 1e8).toFixed(1)}e`
  } else if (n >= 1e4) {
    return `${(n / 1e4).toFixed(1)}w`
  } else if (n >= 1e3) {
    return `${(n / 1e3).toFixed(2)}k`
  } else {
    return n.toFixed(0)
  }
}

export function formatSeconds(seconds: number) {
  const SECONDS_IN_MINUTE = 60
  const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE
  const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR

  const timeUnits = [
    { unit: 'd', value: SECONDS_IN_DAY },
    { unit: 'h', value: SECONDS_IN_HOUR },
    { unit: 'm', value: SECONDS_IN_MINUTE },
    { unit: 's', value: 1 },
  ]
  let result = ''
  for (const { unit, value } of timeUnits) {
    const amount = Math.floor(seconds / value)
    if (amount) {
      result += ` ${amount}${unit}`
      seconds %= value
    }
  }
  return result.trim() || '0s'
}
