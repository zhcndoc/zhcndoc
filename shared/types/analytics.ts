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

export interface AnalyticsMetricExpanded {
  name: string | null
  country?: string
  pageviews: number | string
  visitors: number
  visits: number
  bounces: number
  totaltime: number | string
}

export interface AnalyticsDateRange {
  startAt: number
  endAt: number
}

// 7 rows (0=Sun … 6=Sat) × 24 cols (0=00:00 … 23=23:00)
export type AnalyticsWeekly = number[][]
