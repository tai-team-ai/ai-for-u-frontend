import { type Session } from 'next-auth'
import { uFetch } from './http'

interface JoinMailingListProps {
  session: Session | null
  emailAddress: string
  setIsSubmitting: (v: boolean) => void
  setIsSubscribed: (v: boolean) => void
}

const joinMailingList = async ({ session, emailAddress, setIsSubmitting, setIsSubscribed }: JoinMailingListProps): Promise<void> => {
  setIsSubmitting(true)
  const response = await uFetch('/api/ai-for-u/subscription', {
    session,
    method: 'POST',
    body: JSON.stringify({ emailAddress })
  })
  if (response.status === 200) {
    setIsSubscribed(true)
  }
  if (response.status === 500) {
    setIsSubscribed(false)
  }

  setIsSubmitting(false)
}

export { joinMailingList }
