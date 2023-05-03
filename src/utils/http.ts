import { getUserID } from './user'

// A wrapper around fetch to set userId in the headers by default
export async function uFetch (input: RequestInfo | URL, { ...init }: RequestInit): Promise<Response> {
  const userId = getUserID()
  const defaultHeaders: { 'content-type': string, 'UUID'?: string } = { 'content-type': 'application/json' }
  if (typeof userId !== 'undefined') {
    defaultHeaders.UUID = userId
  }

  return await fetch(input, {
    headers: {
      ...defaultHeaders,
      ...init.headers
    },
    ...init
  })
}
