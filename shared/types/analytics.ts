export interface AnalyticsStats {
  pageviews: { prev: number; value: number }
  visits: { prev: number; value: number }
  visitors: { prev: number; value: number }
  bounces: { prev: number; value: number }
  totaltime: { prev: number; value: number }
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
