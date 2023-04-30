import { type ExampleObject } from '@/components/layout/template'
import { v4 as uuid } from 'uuid'
import { uFetch } from './http'

const prefetchInitialChat = async (): Promise<string> => {
  return await uFetch('/api/ai-for-u/sandbox-chatgpt', {
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

export async function getInitialChat (): Promise<string> {
  if (typeof sessionStorage === 'undefined') {
    return 'no chat yet'
  }
  let initialChat = sessionStorage.getItem('initialChat')
  if (initialChat == null) {
    initialChat = await prefetchInitialChat()
    if (initialChat.length === 0) {
      return 'something went wrong'
    }
  }
  return initialChat
}

// client-side function
export function getUserID (): string {
  let id: string | null = localStorage.getItem('userID')
  if (id === null) {
    id = uuid()
    localStorage.setItem('userID', id)
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

export function getTokenExhaustedCallToAction (canLogInToContinue: boolean): string {
  if (canLogInToContinue) {
    return 'Sign In to Continue'
  } else {
    return 'You\'ve reached your daily limit.'
  }
}
