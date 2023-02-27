import React, {useRef} from "react";
import { Modal, Button, Input, Loading, Image, Text } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { validateSignUp } from "@/utils/validation";


interface LoginModalProps {
    open: boolean
    setOpen: (o: boolean) => void
    isSignUp: boolean
}


const LoginModal = ({open, setOpen, isSignUp = false}: LoginModalProps) => {
    const [loggingIn, setLoggingIn] = React.useState(false);
    const loginForm = useRef<HTMLFormElement>(null)

    const submitLoginForm = async (event?: any) => {
        if (!loginForm.current) return;
        event.preventDefault();

        setLoggingIn(true);
        try {
            const formData = new FormData(loginForm.current);
            const formDataJSON = Object.fromEntries(formData);
            const email = String(formDataJSON["email"]);
            const password = String(formDataJSON["password"]);
            const errorMsg: HTMLParagraphElement | null = document.querySelector(".error-msg");
            if (errorMsg !== null) {
                errorMsg.textContent = ""
                errorMsg.style.display = "none";
            }

            if(isSignUp) {
                const confirmPassword = String(formDataJSON["confirmPassword"]);
                const errors = validateSignUp({email, password, confirmPassword});
                if(errors.length > 0) {
                    if(errorMsg !== null) {
                        errorMsg.innerHTML = errors.join("<br/>");
                        errorMsg.style.display = "block";
                        return;
                    }
                }
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({email, password, confirmPassword})
                });

                const data = await response.json();
                if(response.status === 422) {
                    if (errorMsg !== null) {
                        errorMsg.innerHTML = data.message.replace("\n", "<br/>");
                        errorMsg.style.display = "block";
                        return;
                    }
                }
            }

            signIn("credentials", { email, password, redirect: false})
                .then((response) => {
                    if(typeof response !== "undefined") {
                        if (response.ok) {
                            setOpen(false);
                        }
                        else {
                            if (errorMsg !== null) {
                                errorMsg.textContent = "Invalid email or password";
                                errorMsg.style.display = "block";
                            }
                        }
                    }
                });
        }
        finally {
            setLoggingIn(false);
        }
    }

    return (
        <Modal
            open={open}
            closeButton
            onClose={() => setOpen(false)}
        >
                <Modal.Header>
                    <Text h3>
                        {isSignUp? "Sign up to Access Preview" : "Login to Access Preview"}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                <p style={{color: "red", border: "solid 1px red", backgroundColor: "#ff000011", padding: "1em", display: "none"}} className="error-msg"></p>
                    <form ref={loginForm} id="loginForm" onSubmit={submitLoginForm}>
                        <Input
                            required
                            fullWidth
                            label="Email"
                            placeholder=""
                            initialValue=""
                            inputMode="email"
                            name="email"
                        />
                        <Input.Password
                            fullWidth
                            required
                            label="Password"
                            placeholder=""
                            initialValue=""
                            name="password"
                        />
                        {isSignUp?
                        <Input.Password
                            fullWidth
                            required
                            label="Confirm Password"
                            placeholder=""
                            initialValue=""
                            name="confirmPassword"
                        />
                        :
                        ""
                        }
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
                                isSignUp? "Signup" : "Login"
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
                        >
                            {isSignUp ? "Sign up with Google" : "Sign in with Google"}
                        </Button>
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