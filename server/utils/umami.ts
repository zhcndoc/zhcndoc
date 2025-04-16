import { $fetch } from 'ofetch'

let token = ''

export const baseURL = 'https://umami.ikxin.com/api'

export const UMAMI_WEBSITE_ID = 'f0e90b0d-e086-4fdc-b173-de4857b71900'

export const umami = $fetch.create({
  baseURL,
  onRequest({ options }) {
    options.headers.set('x-umami-share-token', token)
  },
  async onResponseError({ response }) {
    if (response.status === 401) await getUmamiToken()
  },
})

export const getUmamiToken = async () => {
  const umamiAuth = await $fetch(`${baseURL}/share/aHYOn5YKtcPoS5v7`)
  token = umamiAuth?.token
}
