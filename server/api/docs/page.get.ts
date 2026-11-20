import {
  queryCollection,
  queryCollectionItemSurroundings,
} from '@nuxt/content/server'
import { withContentDatabaseRetry } from '../../utils/content'

export default defineEventHandler(async (event) => {
  const { path } = getQuery(event)
  if (
    typeof path !== 'string' ||
    (path !== '/docs' && !path.startsWith('/docs/'))
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid document path',
    })
  }

  const page = await withContentDatabaseRetry(() =>
    queryCollection(event, 'docs')
      .path(path)
      .where('extension', '=', 'md')
      .first(),
  )
  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Document not found' })
  }

  const surround = await withContentDatabaseRetry(() =>
    queryCollectionItemSurroundings(event, 'docs', page.path, {
      fields: ['description'],
    }),
  )
  return { page, surround }
})
