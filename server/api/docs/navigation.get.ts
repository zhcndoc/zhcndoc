import { queryCollectionNavigation } from '@nuxt/content/server'
import { withContentDatabaseRetry } from '../../utils/content'

export default defineEventHandler((event) =>
  withContentDatabaseRetry(() => queryCollectionNavigation(event, 'docs')),
)
