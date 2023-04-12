import { type Session } from 'next-auth'
import { v4 as uuid } from 'uuid'
import { uFetch } from './http'

interface ExampleEntry {
  examples: any[]
  exampleNames: string[]
}

const prefetchExample = async (session: Session | null, route: string): Promise<ExampleEntry> => {
  return await uFetch(route, { session, method: 'GET' })
    .then(async response => {
      if (response.status !== 200) {
        throw new Error('Request for example did not return a 200 status code')
      }
      return await response.json()
    }).then(data => {
      window.localStorage.setItem(route, JSON.stringify(data))
      return data
    }).catch(reason => {
      return {
        examples: [],
        exampleNames: []
      }
    })
}

const prefetchExamples = (session: Session | null): void => {
  const routes = [
    '/api/ai-for-u/sandbox-chatgpt-examples',
    '/api/ai-for-u/text-summarizer-examples',
    '/api/ai-for-u/text-revisor-examples'
  ]
  for (const route of routes) {
    void prefetchExample(session, route)
  }
}

const prefetchInitialChat = async (session: Session | null): Promise<string> => {
  return await uFetch('/api/ai-for-u/sandbox-chatgpt', {
    session,
    method: 'POST',
    body: JSON.stringify({
      conversationUuid: uuid(),
      userMessage: ''
    })
  }).then(async response => {
    return await response.json()
  }).then(data => {
    window.localStorage.setItem('initialChat', data.gptResponse)
    return data.gptResponse
  })
}

export async function getInitialChat (session: Session | null): Promise<string> {
  if (typeof localStorage === 'undefined') {
    return 'no chat yet'
  }
  let initialChat = localStorage.getItem('initialChat')
  if (initialChat == null) {
    initialChat = await prefetchInitialChat(session)
    if (initialChat.length === 0) {
      return 'something went wrong'
    }
  }
  return initialChat
}

// client-side function
export function getUserID (session: Session | null): string | undefined {
  let id
  if ((session != null) && typeof session.user.id !== 'undefined') {
    id = session.user.id
  } else if (typeof window !== 'undefined') { // not logged in
    // check localStorage
    id = window.localStorage.getItem('userID')
    if (id === null) { // localstorage doesn't have a userID, so create one
      // first time visiting the page
      id = uuid()
      window.localStorage.setItem('userID', id)
      prefetchExamples(session)
    }
  }
  return id
}

export async function getExamples (session: Session | null, route: string): Promise<any> {
  const mtExamples = { exampleNames: [], examples: [] }
  if (typeof localStorage === 'undefined') {
    return mtExamples
  }
  const storageItem = localStorage.getItem(route)
  if (storageItem == null) {
    return await prefetchExample(session, route)
  }
  return JSON.parse(storageItem)
}
