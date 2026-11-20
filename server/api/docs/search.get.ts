import { queryCollectionSearchSections } from '@nuxt/content/server'
import { withContentDatabaseRetry } from '../../utils/content'

export default defineEventHandler((event) =>
  withContentDatabaseRetry(() =>
    queryCollectionSearchSections(event, 'docs', {
      minHeading: 'h2',
      maxHeading: 'h3',
      ignoredTags: ['pre'],
    }),
  ),
)
