import React from "react";
// import { Button, Nav } from "react-bootstrap";
import { CssBaseline, Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { constants, routes } from "../../../utils/constants";
import { NavbarProps } from "react-bootstrap";

const LoginButtons = () => {
    return (
        <>
            <Navbar.Link color="inherit" href="#">
                Login
            </Navbar.Link>
            <Navbar.Item>
                <Button auto flat as={Link} href="#">
                Sign Up
                </Button>
            </Navbar.Item>
        </>
    )
}

const LogoutButtons = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate(routes.LOGIN);
    }
    return (
        <Navbar.Item>
            <Button color="error" onClick={logout}>
                Logout
            </Button>
        </Navbar.Item>
    )
}

interface NavBarProps {
    isLoggedIn: boolean
}

const NavBar = (props: NavBarProps) => {
    return (
        <React.Fragment>
            {/* <Navbar bg="dark" expand="lg" className="navbar-dark">
                <Container>
                    <Navbar.Brand>{constants.SITE_NAME}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link>
                                <Button className="btn-warning" onClick={logout}>Logout</Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
            <Navbar isBordered variant="floating">
                <Navbar.Brand>
                {/* <AcmeLogo /> */}
                <Text b color="inherit" hideIn="xs">
                    {constants.SITE_NAME}
                </Text>
                </Navbar.Brand>
                <Navbar.Content hideIn="xs">
                <Navbar.Link href={routes.SANDBOX}>Sandbox</Navbar.Link>
                <Navbar.Link href={routes.TEMPLATES}>Templates</Navbar.Link>
                <Navbar.Link href='#'>Go Pro</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    {props.isLoggedIn ? (
                        <LogoutButtons />
                    ) : (
                        <LoginButtons />
                    )}
                </Navbar.Content>
            </Navbar>
        </React.Fragment>
    );
}
export default NavBar;