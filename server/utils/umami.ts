import { $fetch } from 'ofetch'

export const UMAMI_WEBSITE_ID = 'f0e90b0d-e086-4fdc-b173-de4857b71900'

export const umami = $fetch.create({
  baseURL: 'https://umami.ikxin.com/api',
  headers: {
    'x-umami-share-token': useRuntimeConfig().umamiToken,
  },
})
