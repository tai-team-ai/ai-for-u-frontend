import { joinMailingList } from '@/utils/endpoints'
import styles from '@/styles/Modals.module.css'
import { Text, Button, Input, Loading } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { type CSSProperties, useRef, useState } from 'react'

declare interface SubscribeFieldProps {
  style?: CSSProperties
}

const SubscribeField = ({ style }: SubscribeFieldProps): JSX.Element => {
  const userEmail = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { data: session } = useSession()

  if (isSubscribed) {
    return (
      <div className={styles['subscribe-response']} >
        <Text h3 className={styles['go-pro-animation']}>You're in!</Text>
        <Text h5 css={{ marginTop: '0.3rem' }}>How will you use AI for good in this world? 🌏</Text>
      </div>
    )
  }

  return (
        <form
            id="subscribeForm"
            style={{ marginRight: '4.5rem' }}
            onSubmit={(e) => {
              e.preventDefault()
              if (userEmail.current == null) {
                return
              }
              const emailAddress = userEmail.current.value
              void joinMailingList({ session, emailAddress, setIsSubmitting, setIsSubscribed })
            }}
        >
            <Input
                fullWidth
                className={styles.button}
                placeholder="Join our mailing list!"
                type="email"
                ref={userEmail}
                contentRight={
                    <Button
                        type="submit"
                        auto
                        flat
                    >
                        {!isSubmitting ? 'Subscribe' : <Loading type="points"></Loading>}
                    </Button>
                } />
        </form>)
}

export default SubscribeField
