import { Grid, Modal, Text } from '@nextui-org/react'
import SubscribeField from '../elements/SubscribeField'

declare interface GoProModalProps {
  open: boolean
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>
  message?: string | null
}

const GoProModal = ({ open, setOpenState, message = null }: GoProModalProps): JSX.Element => {
  return (
        <Modal
            open={open}
            closeButton
            onClose={() => { setOpenState(false) }}
            width="40rem"
            css={{
              maxWidth: '90vw',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
        >
            <Modal.Header>
              <Grid.Container alignItems="center" justify="center" direction="column">
                <Text h3 color='error'>Pro Features Coming Soon</Text>
                {message === null
                  ? null
                  : (
                          <Text h6 color='secondary' css={{ marginTop: '-0.5rem', marginBottom: '-0.7rem', padding: '0 4rem' }}>
                              {message}
                          </Text>
                    )
                    }
              </Grid.Container>
            </Modal.Header>
            <Modal.Body css={{ paddingLeft: '3rem', marginBottom: '-0.5rem' }}>
                <Grid.Container>
                    <Grid sm={6}>
                        <div>
                            <Text h4 css={{ marginBottom: '-0.5rem' }}>Powerful AI Tools for U</Text>
                            <ul style={{ listStyleType: 'inherit' }}>
                                <li>Tutoring assistant</li>
                                <li>Paper writing AI templates</li>
                                <li>Baby name AI templates</li>
                                <li>Pair programming assistant</li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid sm={6}>
                        <div>
                            <Text h4 css={{ marginBottom: '-0.5rem' }}>Supercharge your Workflow</Text>
                            <ul style={{ listStyleType: 'circle' }}>
                                <li>Save responses and conversations</li>
                                <li>Auto email resposes for Gmail</li>
                                <li>10x daily usage limit</li>
                                <li>Google Drive Integration</li>
                            </ul>
                        </div>
                    </Grid>
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer justify="center">
                <SubscribeField style={{ marginRight: '6rem', marginBottom: '0.5rem', marginTop: '0.3rem' }} />
            </Modal.Footer>
        </Modal>
  )
}

export default GoProModal
