import { type ExampleObject } from '@/components/layout/template'
import { type Session } from 'next-auth'
import { v4 as uuid } from 'uuid'
import { uFetch } from './http'

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
    sessionStorage.setItem('initialChat', data.gptResponse)
    return data.gptResponse
  })
}

export async function getInitialChat (session: Session | null): Promise<string> {
  if (typeof sessionStorage === 'undefined') {
    return 'no chat yet'
  }
  let initialChat = sessionStorage.getItem('initialChat')
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
    }
  }
  return id
}

export async function getExamples (task: string): Promise<ExampleObject[]> {
  const examples: ExampleObject[] = []
  const rawExamples = await (await (await fetch(`${process.env.API_URL as string}/ai-for-u/${task}-examples`)).json())
  console.log(rawExamples)
  if (typeof rawExamples.exampleNames !== 'undefined') {
    for (let i = 0; i < rawExamples.exampleNames.length; i++) {
      examples.push({
        name: rawExamples.exampleNames[i],
        example: rawExamples.examples[i]
      })
    }
  }
  return examples
}

export function getTokenExhaustedCallToAction (userLoggedIn: boolean): string {
  if (userLoggedIn) {
    return 'You\'ve reached your daily limit. Check back tomorrow!'
  } else {
    return 'Sign In to Continue 🎉'
  }
}
