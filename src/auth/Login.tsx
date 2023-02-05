import axios from "axios";
import React from "react";
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const submitLoginForm = (event: any) => {
        event.preventDefault();
        const formElement: HTMLFormElement | null = document.querySelector('#loginForm');
        if (!formElement) {
            return;
        }
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#login-btn');
        if (!btnPointer) {
            return;
        }
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', "true");
        // axios.post(loginAPI, formDataJSON).then((response) => {
        //     btnPointer.innerHTML = 'Login';
        //     btnPointer.removeAttribute('disabled');
        //     const data = response.data;
        //     const token = data.token;
        //     if (!token) {
        //         alert('Unable to login. Please try after some time.');
        //         return;
        //     }
        //     localStorage.clear();
        //     localStorage.setItem('user-token', token);
        //     setTimeout(() => {
        //         navigate('/');
        //     }, 500);
        // })
        // .catch((error) => {
        //     btnPointer.innerHTML = 'Login';
        //     btnPointer.removeAttribute('disabled');
        //     alert("Oops! Some error occured.");
        // });
        localStorage.clear();
        const token = formDataJSON["username"];
        localStorage.setItem('user-token', String(token));
        setTimeout(() => {
            navigate('/');
        }
        , 500);
        console.log(formDataJSON);
    }

    return (
        <React.Fragment>
            <Container className="my-5">
                <h2 className="fw-normal mb-5">Login To React Auth Demo</h2>
                <Row>
                    <Col md={{span: 6}}>
                        <Form id="loginForm" onSubmit={submitLoginForm}>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-username'}>Username</FormLabel>
                                <input type={'text'} className="form-control" id={'login-username'} name="username" required />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-password'}>Password</FormLabel>
                                <input type={'password'} className="form-control" id={'login-password'} name="password" required />
                            </FormGroup>
                            <Button type="submit" className="btn-success mt-2" id="login-btn">Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
export default Login;