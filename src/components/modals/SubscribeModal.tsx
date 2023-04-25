import React, { useState, useRef } from 'react'
import styles from '@/styles/Modals.module.css'
import { Modal, Button, Input, Loading, Text } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { joinMailingList } from '@/utils/endpoints'

export interface SubscribeModalProps {
  open: boolean
  setOpen: (o: boolean) => void
}

export default function SubscribeModal ({ open, setOpen }: SubscribeModalProps): JSX.Element {
  const userEmail = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { data: session } = useSession()

  return (
        <Modal
            closeButton
            open={open}
            onClose={
              () => {
                setIsSubscribed(false)
                setOpen(false)
              }
            }
            css={{
              maxWidth: '90vw',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
        >
            <form id="subscribeForm" onSubmit={(e) => {
              e.preventDefault()
              if (userEmail.current == null) {
                return
              }
              const emailAddress = userEmail.current.value
              void joinMailingList({ session, emailAddress, setIsSubmitting, setIsSubscribed })
            }}>
                <Modal.Header css={{ marginBottom: '-0.9rem' }}>
                    <Text h3 className={styles['go-pro-animation']}>More features coming soon!</Text>
                </Modal.Header>
                <Modal.Body css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {!isSubscribed
                      ? (
                        <>
                            <Text>Join our mailing list</Text>
                            <Input
                                clearable
                                fullWidth
                                color="primary"
                                size="lg"
                                placeholder="Email"
                                ref={userEmail}
                            />
                        </>
                        )
                      : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                          <Text h3>You're in!!! 🎉 </Text>
                          <Text h4>Here's to using AI to make the world a better place! 🥂</Text>
                        </div>
                        )}
                </Modal.Body>
                <Modal.Footer>
                    {
                    isSubscribed
                      ? null
                      : <Button
                        auto
                        flat
                        color="primary"
                        type="submit"
                        className={styles.button}
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                          ? (
                            <Loading type="points" />
                            )
                          : (
                              'Subscribe'
                            )}
                    </Button>
                    }
                </Modal.Footer>
            </form>

        </Modal>
  )
}
