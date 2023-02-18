import React, {useRef} from "react";
import axios from "axios";
import { constants } from "../utils/constants";
// import { Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { CssBaseline, Navbar, Button, Input, Loading } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Login = () => {
    const [loggingIn, setLoggingIn] = React.useState(false);
    const navigate = useNavigate();
    const loginForm = useRef<HTMLFormElement>(null)
    const submitLoginForm = (event: any) => {
        if (!loginForm.current) return;
        setLoggingIn(true);
        event.preventDefault();

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
                    navigate('/');
                }, 500);
            })
            .catch((error) => {
                alert("Oops! An error occurred, Please try again.");
                console.log(error);
            })
            .finally(() => {
                setLoggingIn(false);
            }
        );
    }

    return (
        <React.Fragment>
                <h2 className="fw-normal mb-5">Login to Access Preview</h2>
                <form ref={loginForm} id="loginForm" onSubmit={submitLoginForm}>
                    <Input
                        clearable
                        label="Access-Code"
                        placeholder=""
                        initialValue="" 
                        type="password"
                    />
                    <Button
                        type="submit"
                        id="login-btn"
                        disabled={loggingIn}
                    >
                        {loggingIn ? (
                            <Loading type="points" />
                        ) : (
                            "Login"
                        )}
                        </Button>
                </form>
                {loggingIn && <CircularProgress className="mt-3" />}
        </React.Fragment>
    );
}
export default Login;