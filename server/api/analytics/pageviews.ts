export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  let { startAt, endAt } = getTimeRange()

  if (query.startAt && query.endAt) {
    startAt = Number(query.startAt)
    endAt = Number(query.endAt)
  }

  const unit = getUnitByTime(startAt, endAt)

  const { data } = await umami.getWebsitePageviews(
    'f0e90b0d-e086-4fdc-b173-de4857b71900',
    {
      startAt,
      endAt,
      timezone: 'Asia/Shanghai',
      unit,
    },
  )

  return data
})
