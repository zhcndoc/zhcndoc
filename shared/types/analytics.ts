export interface AnalyticsStats {
  pageviews: number
  visits: number
  visitors: number
  bounces: number
  totaltime: number
  comparison?: {
    pageviews: number
    visits: number
    visitors: number
    bounces: number
    totaltime: number
  }
}

export interface AnalyticsPageviews {
  compare?: Omit<AnalyticsPageviews, 'compare'>
  pageviews: {
    x: string
    y: number
  }[]
  sessions: {
    x: string
    y: number
  }[]
}

export interface AnalyticsMetric {
  x: string
  y: number
}

export interface AnalyticsDateRange {
  startAt: number
  endAt: number
}
