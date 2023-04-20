import React, { useState } from 'react'
import { Modal, Button, Input, Loading, Text } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { uFetch } from '@/utils/http'
import styles from '@/styles/Modals.module.css'

export interface ResponseProps {
  aiResponseFeedbackContext: any
  aiToolEndpointName: string
  userPromptFeedbackContext: any
}

export function RateResponse ({ aiResponseFeedbackContext, aiToolEndpointName, userPromptFeedbackContext }: ResponseProps): JSX.Element {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  return (
    <>
        <div style={{ marginTop: '-.4rem', marginBottom: '-.4rem' }}>
            <span
                className={styles['rate-btn']}
                onClick={() => { setShowFeedbackModal(true) }}
            >
                Rate this response?
            </span>
        </div>
        <FeedbackModal
            open={showFeedbackModal}
            setOpen={setShowFeedbackModal}
            aiResponseFeedbackContext={aiResponseFeedbackContext}
            aiToolEndpointName={aiToolEndpointName}
            userPromptFeedbackContext={userPromptFeedbackContext}
        />
    </>)
}

interface FeedbackModalProps {
  open: boolean
  setOpen: (o: boolean) => void
  aiResponseFeedbackContext: any
  aiToolEndpointName: string
  userPromptFeedbackContext: any
}

interface StarRatingProps {
  rating: number
  setRating: (o: number) => void
}

const StarRating = ({ rating, setRating }: StarRatingProps): JSX.Element => {
  const [hover, setHover] = useState(5)
  return (
      <div className={styles['star-rating']}>
        <span className={styles['glitter-container']}>
          {[...Array(5)].map((star, index) => {
            index += 1
            return (
              <button
                type="button"
                key={index}
                className={`${styles[index <= (hover) ? 'on' : 'off']} ${styles['star-btn']}`}
                onClick={() => { setRating(index) }}
                onMouseEnter={() => { setHover(index) }}
                onMouseLeave={() => { setHover(rating) }}
              >
                <span className={styles.star}>&#9733;</span>
              </button>
            )
          })}
        </span>
      </div>
  )
}

const FeedbackModal = ({ open, setOpen, aiResponseFeedbackContext, aiToolEndpointName, userPromptFeedbackContext }: FeedbackModalProps): JSX.Element => {
  const { data: session } = useSession()
  const [rating, setRating] = useState(5)
  const [writtenFeedback, setWrittenFeedback] = useState('')
  const [loading, setLoading] = useState(false)

  const submitFeedback = async (): Promise<void> => {
    setLoading(true)
    const response = await uFetch('/api/ai-for-u/feedback', {
      session,
      method: 'POST',
      body: JSON.stringify({ rating: String(rating), writtenFeedback, aiResponseFeedbackContext, aiToolEndpointName, userPromptFeedbackContext })
    })
    const data = await response.json()
    console.log(data)
    setOpen(false)
    setLoading(false)
  }

  return (
        <Modal
            open={open}
            closeButton
            onClose={() => { setOpen(false) }}
            css={{
              maxWidth: '90vw',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
        >
                <Modal.Header>
                    <Text h3 className={styles['go-pro-animation']}>
                        How'd the AI do?
                    </Text>
                </Modal.Header>
                    <Modal.Body css={{ marginBottom: '-0.5rem', marginTop: '-1.1rem' }}>
                        <StarRating
                            rating={rating}
                            setRating={setRating}
                        />
                            <Input
                            type="text"
                            placeholder={rating < 5 ? 'What could we ask the AI to do better?' : 'Amazing! 🎉 What was great about it?'}
                            onChange={(event: any) => { setWrittenFeedback(event.target.value) }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            auto
                            flat
                            type="submit"
                            color="primary"
                            className={styles.button}
                            disabled={loading}
                            onPress={() => { void submitFeedback() }}
                        >
                            {loading ? <Loading type="points"/> : 'Submit'}
                        </Button>
                    </Modal.Footer>
        </Modal>
  )
}
export default FeedbackModal
