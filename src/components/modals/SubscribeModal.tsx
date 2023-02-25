import React, { useState, useRef } from "react";
import { Modal, Button, Input, Loading, Text } from "@nextui-org/react";

interface SubscribeModalProps {
    open: boolean
    setOpen: (o: boolean) => void
}

export default function SubscribeModal({open, setOpen}: SubscribeModalProps) {
    const userEmail = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const submitForm = () => {
        if (!userEmail.current) return;

        setIsSubmitting(true)
        // todo, actually subscribe to a mailing list
        console.log(`subscribing user email: ${userEmail.current.value}`)

        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubscribed(true)
        }, 2000)
    }

    return (
        <Modal
            closeButton
            open={open}
            onClose={() => setOpen(false)}
        >
            <form id="loginForm" onSubmit={submitForm}>
                <Modal.Header>
                    <Text h3>Premium feature coming soon!</Text>
                </Modal.Header>
                <Modal.Body>
                    {!isSubscribed ? (
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
                    ) : (
                        <Text>Thanks for joining our mailing list.</Text>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        auto
                        light
                        color="error"
                        onPress={() => {setOpen(false)}}
                    >
                        Close
                    </Button>
                    <Button
                        auto
                        flat
                        color="primary"
                        onPress={submitForm}
                    >
                        {isSubmitting ? (
                            <Loading type="points" />
                        ) : (
                            "Subscribe"
                        )}
                    </Button>
                </Modal.Footer>
            </form>
            
        </Modal>
    )
}
