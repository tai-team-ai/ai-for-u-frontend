import { Button, Grid, Modal, Spacer, Text, useModal } from "@nextui-org/react";
import SubscribeField from "../elements/SubscribeField";

declare type GoProModalProps = {
    bindings: {open: boolean, onClose: () => void}
}


const GoProModal = ({bindings}: GoProModalProps) => {
    return (
        <Modal
            closeButton
            {...bindings}
            width="600px"
        >
            <Modal.Header>
                <Text h3>Go Pro to unlock all the features.</Text>
            </Modal.Header>
            <Modal.Body>
                <Grid.Container>
                    <Grid sm={6}>
                        <div>
                            <Text h4>Feature set 1</Text>
                            <ul style={{listStyleType: "circle"}}>
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
                            <ul style={{listStyleType: "circle"}}>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                                <li>Do magna ex eiusmod mollit enim magna minim in minim nisi esse.</li>
                            </ul>
                        </div>
                    </Grid>
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer justify="center">
                <SubscribeField/>
            </Modal.Footer>
        </Modal>
    )
}

export default GoProModal;
