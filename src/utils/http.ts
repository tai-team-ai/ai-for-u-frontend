import { type Session } from 'next-auth'
import { getUserID } from './user'

interface uFetchProps extends RequestInit {
  session?: Session | null
}

// A wrapper around fetch to set userId in the headers by default
export async function uFetch (input: RequestInfo | URL, { session = null, ...init }: uFetchProps): Promise<Response> {
  const userId = getUserID(session)
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
