const CONTENT_DB_RETRY_DELAYS = [120, 240, 400]

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const isTransientContentDatabaseError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)

  return (
    message.includes('no such table: _content_') ||
    message.includes('Database integrity check failed')
  )
}

export const withContentDatabaseRetry = async <T>(loader: () => Promise<T>) => {
  for (let attempt = 0; attempt <= CONTENT_DB_RETRY_DELAYS.length; attempt++) {
    try {
      return await loader()
    } catch (error) {
      if (
        !isTransientContentDatabaseError(error) ||
        attempt === CONTENT_DB_RETRY_DELAYS.length
      ) {
        throw error
      }

      await sleep(CONTENT_DB_RETRY_DELAYS[attempt]!)
    }
  }

  throw new Error('Unreachable')
}
