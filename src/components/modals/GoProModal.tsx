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
            width="50rem"
            css={{
              maxWidth: '90vw',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
        >
            <Modal.Header>
                <Text h3>Go Pro to unlock all the features.</Text>
            </Modal.Header>
            <Modal.Body>
                <Grid.Container>
                    <Grid sm={6}>
                        <div>
                            <Text h4>Feature set 1</Text>
                            <ul style={{ listStyleType: 'circle' }}>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid sm={6}>
                        <div>
                            <Text h4>Feature set 1</Text>
                            <ul style={{ listStyleType: 'circle' }}>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                            </ul>
                        </div>
                    </Grid>
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer justify="flex-end">
                <SubscribeField style={{ marginRight: '4rem' }} />
            </Modal.Footer>
        </Modal>
  )
}

export default GoProModal
