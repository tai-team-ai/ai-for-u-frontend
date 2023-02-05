
import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { constants } from "../utils/constants";

const AuthNavbar = () => {
    return (
        <React.Fragment>
            <Navbar bg="dark" expand="lg" className="navbar-dark">
                <Container>
                    <Navbar.Brand>{constants.SITE_NAME}</Navbar.Brand>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}
export default AuthNavbar;