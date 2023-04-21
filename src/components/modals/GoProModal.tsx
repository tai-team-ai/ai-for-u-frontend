import { Grid, Modal, Text } from '@nextui-org/react'
import SubscribeField from '../elements/SubscribeField'
import { isMobile } from '../../utils/hooks'
import styles from '@/styles/Modals.module.css'

declare interface GoProModalProps {
  open: boolean
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>
  message?: string | null
}

const AI_TOOLS = [
  '10x daily usage limit',
  'Save responses and conversations',
  'Auto email responses for Gmail',
  'Google Drive Integration',
  'Tutoring assistant',
  'Paper writing AI templates',
  'Baby name AI templates',
  'Pair programming assistant'
]

const GoProModal = ({ open, setOpenState, message = null }: GoProModalProps): JSX.Element => {
  return (
        <Modal
            open={open}
            closeButton
            onClose={() => { setOpenState(false) }}
            width="41rem"
            blur
            css={{
              maxWidth: '90vw',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
        >
            <Modal.Header>
              <Grid.Container alignItems="center" justify="center" direction="column" css={{ padding: '0 0' }}>
              <Text h3 className={styles['go-pro-animation']} css={{ marginLeft: '-1rem', marginRight: '-1rem' }}>
                {message !== null &&
                  <span style={{ display: 'block' }}>
                    {message}
                  </span>
                }
                Pro Features Coming Soon!
              </Text>
              </Grid.Container>
            </Modal.Header>
            <Modal.Body css={{ marginBottom: '-0.5rem', marginTop: '-0.2rem' }}>
                  {isMobile()
                    ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-0.5rem' }}>
                            {AI_TOOLS.map((tool, index) => (
                              <Text h4 key={index} className={styles['go-pro-features-list-mobile']}>
                                {tool}
                              </Text>
                            ))}
                          </ul>
                        </div>

                      )
                    : (
                    <Grid.Container direction="row">
                      <Grid sm={6}>
                        <div style={{ marginLeft: '2rem' }}>
                          <Text h4 css={{ marginBottom: '-0.5rem' }}>Supercharge your Workflow</Text>
                          <ul style={{ listStyleType: 'inherit', alignItems: 'left' }}>
                            {AI_TOOLS.slice(0, 4).map((tool, index) => (
                              <li key={index} className="go-pro">
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Grid>
                    <Grid sm={6}>
                        <div style={{ marginLeft: '1rem' }} >
                            <Text h4 css={{ marginBottom: '-0.5rem' }}>Powerful AI Tools for U</Text>
                            <ul style={{ listStyleType: 'inherit', alignItems: 'left' }}>
                            {AI_TOOLS.slice(4, 8).map((tool, index) => (
                              <li key={index} className="go-pro">
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                    </Grid>
                    </Grid.Container>
                      )}
            </Modal.Body>
            <Modal.Footer justify="center">
                <SubscribeField style={{ marginRight: '5rem', marginBottom: '0.5rem', marginTop: '0.3rem' }} />
            </Modal.Footer>
        </Modal>
  )
}

export default GoProModal
