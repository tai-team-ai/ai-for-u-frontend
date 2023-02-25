import React, {useRef} from "react";
import axios from "axios";
import { constants } from "@/utils/constants";
import { Modal, Button, Input, Loading } from "@nextui-org/react";
import Router from 'next/router';

interface LoginModalProps {
    open: boolean
    setOpen: (o: boolean) => void
}
const LoginModal = ({open, setOpen}: LoginModalProps) => {
    const [loggingIn, setLoggingIn] = React.useState(false);
    const loginForm = useRef<HTMLFormElement>(null)

    const submitLoginForm = (event?: any) => {
        if (!loginForm.current) return;
        event.preventDefault();

        setLoggingIn(true);

        const formData = new FormData(loginForm.current);
        const formDataJSON = Object.fromEntries(formData);
        const token = String(formDataJSON["username"]);

        const request_body = {
            token: token
        }
        console.log(`Sending request ${JSON.stringify(request_body)} to ${constants.API_URL}${constants.AUTH_API_PREFIX}`)
        axios.post(constants.API_URL + constants.AUTH_API_PREFIX, request_body)
            .then((response) => {
                console.log(response);
                const data = response.data;
                const authenticated = data["authenticated"];
                console.log("authenticated: " + authenticated)
                if (authenticated == null || !authenticated) {
                    alert('Error logging on. Please verify the spelling of your access code and try again.');
                    return;
                }
                localStorage.clear();
                localStorage.setItem(constants.LOCAL_TOKEN_KEY_NAME, token);
                setTimeout(() => {
                    Router.push('/');
                }, 500);
            })
            .catch((error) => {
                alert("Oops! An error occurred, Please try again.");
                console.log(error);
            })
            .finally(() => {
                setLoggingIn(false);
                setOpen(false)
            }
        );
    }

    return (
        <Modal
            open={open}
            closeButton
            onClose={() => setOpen(false)}
        >
            <form ref={loginForm} id="loginForm" onSubmit={submitLoginForm}>
                <Modal.Header>
                    <h3>Login to Access Preview</h3>
                </Modal.Header>
                <Modal.Body>
                        <Input.Password
                            fullWidth
                            label="Access-Code"
                            placeholder=""
                            initialValue=""
                        />
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
                        type="submit"
                        disabled={loggingIn}
                    >
                        {loggingIn ? (
                            <Loading type="points" />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
export default LoginModal;