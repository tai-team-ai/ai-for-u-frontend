import React, {useState} from "react";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { constants, routes } from "../../../utils/constants";
import LoginModal from "../../../auth/Login";
import { useSession, signOut } from "next-auth/react";

interface LoginButtonProps {
    onLogin: () => void
}

const LoginButtons = ({onLogin}: LoginButtonProps) => {
    return (
        <>
            <Navbar.Link color="inherit" onPress={onLogin}>
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
    return (
        <Navbar.Item>
            <Button color="error" onPress={() => signOut()}>
                Logout
            </Button>
        </Navbar.Item>
    )
}

interface NavBarProps {
}

const NavBar = ({}: NavBarProps) => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const {data: session} = useSession();

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
                    {session ? (
                        <LogoutButtons />
                    ) : (
                        <LoginButtons onLogin={() => setShowLoginModal(true)} />
                    )}
                </Navbar.Content>
            </Navbar>
            <LoginModal
                open={showLoginModal}
                setOpen={(o) => setShowLoginModal(o)}
            />
        </React.Fragment>
    );
}
export default NavBar;