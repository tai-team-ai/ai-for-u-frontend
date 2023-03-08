import React, { useState, useRef } from "react";
import { Modal, Button, Input, Loading, Text } from "@nextui-org/react";
import { getUserID } from "@/utils/user";
import { validateEmail } from "@/utils/validation";

interface SubscribeModalProps {
    open: boolean
    setOpen: (o: boolean) => void
}

export default function SubscribeModal({open, setOpen}: SubscribeModalProps) {
    const userEmail = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const submitForm = async () => {
        if (!userEmail.current) {
            return;
        }
        if (!validateEmail(userEmail.current.value)) {
            return;// TODO: display error message??
        }

        setIsSubmitting(true)
        const email = userEmail.current.value;
        const response = await fetch("/api/email-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-ID": getUserID(null)!
            },
            body: JSON.stringify({ email })
        });
        console.log(`subscribing user email: ${userEmail.current.value}`)
        if(response.status === 200) {
            setIsSubmitting(false);
            setIsSubscribed(true);
        }
        else {
            setIsSubmitting(false);
            const {message} = await response.json();
            console.error(message); // TODO: display error message??
        }
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
                    {

                    isSubscribed? null :
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
                    }
                </Modal.Footer>
            </form>

        </Modal>
    )
}
