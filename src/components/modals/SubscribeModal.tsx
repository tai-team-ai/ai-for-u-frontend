import React, { useState, useRef } from 'react'
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
            onClose={() => { setOpen(false) }}
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
              const email = userEmail.current.value
              void joinMailingList({ session, email, setIsSubmitting, setIsSubscribed })
            }}>
                <Modal.Header>
                    <Text h3>More feature coming soon!</Text>
                </Modal.Header>
                <Modal.Body>
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
                        <Text>Thanks for joining our mailing list.</Text>
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
