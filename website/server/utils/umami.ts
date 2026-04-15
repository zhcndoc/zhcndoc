import { $fetch } from 'ofetch'

export const baseURL = 'https://umami.ikxin.com/api'

export const UMAMI_WEBSITE_ID = 'f0e90b0d-e086-4fdc-b173-de4857b71900'

export const umami = $fetch.create({
  baseURL,
  onRequest({ options }) {
    const { umamiToken } = useRuntimeConfig()
    options.headers.set('Authorization', `Bearer ${umamiToken}`)
  },
})
