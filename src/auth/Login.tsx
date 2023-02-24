import React, {useRef} from "react";
import { Modal, Button, Input, Loading, Image } from "@nextui-org/react";
import { signIn } from "next-auth/react";


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
        const username = String(formDataJSON["email"]);
        const password = String(formDataJSON["password"]);
        const errorMsg: HTMLParagraphElement | null = document.querySelector(".error-msg");
        if (errorMsg !== null) {
            errorMsg.textContent = ""
            errorMsg.style.display = "none";
        }
        signIn("credentials", {username, password, redirect: false})
            .then((response) => {
                if(typeof response !== "undefined") {
                    if (response.ok) {
                        setLoggingIn(false);
                        setOpen(false);
                    }
                    else {
                        setLoggingIn(false);
                        if (errorMsg !== null) {
                            errorMsg.textContent = "Invalid email or password";
                            errorMsg.style.display = "block";
                        }
                    }
                }
            })
    }

    return (
        <Modal
            open={open}
            closeButton
            onClose={() => setOpen(false)}
        >

                <Modal.Header justify="flex-start">
                    <h3>Login to Access Preview</h3>

                </Modal.Header>
                <Modal.Body>
                <p style={{color: "red", border: "solid 1px red", backgroundColor: "#ff000011", padding: "1em", display: "none"}} className="error-msg"></p>
                    <form ref={loginForm} id="loginForm" onSubmit={submitLoginForm}>
                        <Input
                            fullWidth
                            label="Email"
                            placeholder=""
                            initialValue=""
                            inputMode="email"
                            name="email"
                        />
                        <Input.Password
                            fullWidth
                            label="Password"
                            placeholder=""
                            initialValue=""
                            name="password"
                        />
                    <Button
                        auto
                        type="submit"
                        disabled={loggingIn}
                        form="loginForm"
                        css={{marginTop: "1em"}}
                    >
                        {loggingIn ? (
                            <Loading type="points" />
                        ) : (
                            "Login"
                        )}
                    </Button>
                    </form>

                    <form id="googleForm">

                        <Button
                            onPress={() => signIn("google")}
                            className="google-login-btn"
                            type="submit"
                            bordered
                            size="lg"
                            iconLeftCss={{left: "0"}}
                            icon={<Image src="/btn_google_light_normal_ios.svg"/>}
                    > Sign in with Google</Button>
                    </form>

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

                </Modal.Footer>
        </Modal>
    );
}
export default LoginModal;