export interface InsightStats {
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

export interface InsightPageviews {
  compare?: Omit<InsightPageviews, 'compare'>
  pageviews: {
    x: string
    y: number
  }[]
  sessions: {
    x: string
    y: number
  }[]
}

export interface InsightMetric {
  x: string
  y: number
}

export interface InsightMetricExpanded {
  name: string | null
  country?: string
  pageviews: number | string
  visitors: number
  visits: number
  bounces: number
  totaltime: number | string
}

export interface InsightDateRange {
  startAt: number
  endAt: number
}

// 7 rows (0=Sun … 6=Sat) × 24 cols (0=00:00 … 23=23:00)
export type InsightWeekly = number[][]

export interface InsightSession {
  id: string
  websiteId: string
  hostname: string
  browser: string
  os: string
  device: string
  screen: string
  language: string
  country: string
  region: string
  city: string
  firstAt: string
  lastAt: string
  visits: number
  views: number
  createdAt: string
}

export interface InsightSessionsResponse {
  data: InsightSession[]
  count: number
  page: number
  pageSize: number
}
