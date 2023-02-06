import axios from "axios";
import { constants } from "../utils/constants";
import React from "react";
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";


const Login = () => {
    const [loadingState, setLoadingState] = React.useState(false);
    const navigate = useNavigate();
    const submitLoginForm = (event: any) => {
        setLoadingState(true);
        event.preventDefault();
        const formElement: HTMLFormElement | null = document.querySelector('#loginForm');
        if (!formElement) {
            return;
        }
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const token = String(formDataJSON["username"]);
        const btnPointer = document.querySelector('#login-btn');
        if (!btnPointer) {
            return;
        }
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', "true");

        const request_body = {
            token: token
        }
        console.log(`Sending request ${JSON.stringify(request_body)} to ${constants.API_URL}${constants.AUTH_API_PREFIX}`)
        axios.post(constants.API_URL + constants.AUTH_API_PREFIX, request_body)
            .then((response) => {
                console.log(response);
                btnPointer.innerHTML = 'Login';
                btnPointer.removeAttribute('disabled');
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
                btnPointer.innerHTML = 'Login';
                btnPointer.removeAttribute('disabled');
                alert("Oops! An error occurred, Please try again.");
                console.log(error);
            })
            .finally(() => {
                setLoadingState(false);
            }
        );
    }

    return (
        <React.Fragment>
            <Container className="my-5">
                <h2 className="fw-normal mb-5">Login to Access Preview</h2>
                <Row>
                    <Col md={{span: 6}}>
                        <Form id="loginForm" onSubmit={submitLoginForm}>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-username'}>Access-Code</FormLabel>
                                <input type={'text'} className="form-control" id={'login-username'} name="username" required />
                            </FormGroup>
                            <Button type="submit" className="btn-success mt-2" id="login-btn">Login</Button>
                        </Form>
                        {loadingState && <CircularProgress className="mt-3" />}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
export default Login;