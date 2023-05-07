import { type ExampleObject } from '@/components/layout/template'
import { v4 as uuid } from 'uuid'

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
