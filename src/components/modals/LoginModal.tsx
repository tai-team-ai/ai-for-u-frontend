import React, {useEffect, useRef, useState} from "react";
import { Modal, Button, Input, Loading, Image, Text, Card } from "@nextui-org/react";
import EmailIcon from '@mui/icons-material/Email';
import { signIn } from "next-auth/react";
import { validateSignUp } from "@/utils/validation";


interface LoginModalProps {
    open: boolean
    setOpen: (o: boolean) => void
    isSignUp: boolean
}


const LoginModal = ({open, setOpen, isSignUp = false}: LoginModalProps) => {
    const [loggingIn, setLoggingIn] = React.useState(false);
    const loginForm = useRef<HTMLFormElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>('')
    const [modalState, setModalState] = useState<"providers"|"email">("providers");

    useEffect(() => {
        if (open) {
            setModalState("providers")
            setErrorMessage("")
        }
    }, [open])

    const submitLoginForm = async (event?: any) => {
        if (!loginForm.current) return;
        event.preventDefault();

        setLoggingIn(true);
        try {
            const formData = new FormData(loginForm.current);
            const formDataJSON = Object.fromEntries(formData);
            const email = String(formDataJSON["email"]);
            const password = String(formDataJSON["password"]);

            if(isSignUp) {
                const confirmPassword = String(formDataJSON["confirmPassword"]);
                const errors = validateSignUp({email, password, confirmPassword});
                if(errors.length > 0) {
                    setErrorMessage(errors.join("<br/>"));
                }
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({email, password, confirmPassword})
                });

                const data = await response.json();
                if(response.status === 422) {
                    setErrorMessage(data.message.replace("\n", "<br/>"));
                    return;
                }
            }

            signIn("credentials", { email, password, redirect: false})
                .then((response) => {
                    if(typeof response !== "undefined") {
                        if (response.ok) {
                            setOpen(false);
                        }
                        else {
                            setErrorMessage("Invalid email or password");
                        }
                    }
                });
        }
        finally {
            setLoggingIn(false);
        }
    }

    const getContentEmail = () =>  {
        return (
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
                        style={{width: "100%"}}
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
        )
    }

    const getContentProviders = () => {
        return (
            <>
                <Button
                    onPress={() => setModalState("email")}
                    className="email-login-btn"
                    bordered
                    size="lg"
                    iconLeftCss={{left: "12px"}}
                    icon={<EmailIcon shapeRendering='rounded' />}
                >
                    {isSignUp ? "Sign up with Email" : "Login with Email"}
                </Button>
                <Button
                    onPress={() => signIn("google")}
                    className="google-login-btn"
                    bordered
                    size="lg"
                    iconLeftCss={{left: "0"}}
                    icon={<Image src="/btn_google_light_normal_ios.svg"/>}
                >
                    {isSignUp ? "Sign up with Google" : "Login with Google"}
                </Button>
            </>
 
        )
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
                <Card
                    variant="bordered"
                    css={{
                        background: '$red100',
                        borderColor: '$red700',
                        display: errorMessage ? 'block' : 'none'
                    }}>
                    <Card.Body>
                        <Text css={{color: '$red700'}} dangerouslySetInnerHTML={{__html: errorMessage}} />
                    </Card.Body>
                </Card>
                    {modalState == "providers" ? (
                        getContentProviders()
                    ) : ('')}
                    {modalState == "email" ? (
                        getContentEmail()
                    ) : ('')}
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