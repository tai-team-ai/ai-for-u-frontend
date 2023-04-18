import { Grid, Modal, Text } from '@nextui-org/react'
import SubscribeField from '../elements/SubscribeField'

declare interface GoProModalProps {
  bindings: { open: boolean, onClose: () => void }
}

const GoProModal = ({ bindings }: GoProModalProps): JSX.Element => {
  return (
        <Modal
            closeButton
            {...bindings}
            width="40rem"
            css={{
              maxWidth: '90vw',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
        >
            <Modal.Header>
                <Text h3 color='error'>Pro Features Coming Soon</Text>
            </Modal.Header>
            <Modal.Body css={{ paddingLeft: '3rem' }}>
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
            <Modal.Footer justify="flex-end">
                <SubscribeField style={{ marginRight: '6rem', marginBottom: '0.5rem' }} />
            </Modal.Footer>
        </Modal>
  )
}

export default GoProModal
