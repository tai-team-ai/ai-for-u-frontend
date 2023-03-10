import React, {useState} from "react";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { constants, routes } from "../../../utils/constants";
import LoginModal from "../../modals/LoginModal";
import { useSession, signOut } from "next-auth/react";
import styles from '@/styles/Navbar.module.css';

interface LoginButtonProps {
    onLogin: () => void
    onSignUp: () => void
}

const LoginButtons = ({onLogin, onSignUp}: LoginButtonProps) => {
    return (
        <>
            <Navbar.Link color="inherit" onPress={onLogin}>
                Login
            </Navbar.Link>
            <Navbar.Item>
                <Button auto flat onPress={onSignUp}>
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
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
    const {data: session} = useSession();

    const sandboxActive = typeof window !== 'undefined' && window.location.pathname == routes.SANDBOX;
    const templatesActive = typeof window !== 'undefined' && window.location.pathname == routes.TEMPLATES;

    return (
        <React.Fragment>
            <Navbar isBordered variant="floating">
                <Navbar.Brand>
                    <Link href={routes.ROOT}>
                        <img className={styles['logo']} src="/logo.png"></img>
                    </Link>
                </Navbar.Brand>
                <Navbar.Content hideIn="xs">
                    <Navbar.Link isActive={sandboxActive} href={routes.SANDBOX}>Sandbox</Navbar.Link>
                    <Navbar.Link isActive={templatesActive} href={routes.TEMPLATES}>Templates</Navbar.Link>
                    <Navbar.Link href='#'>Go Pro</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    {session ? (
                        <LogoutButtons />
                    ) : (
                        <LoginButtons
                            onLogin={() => setShowLoginModal(true)}
                            onSignUp={() => setShowSignUpModal(true)}
                        />
                    )}
                </Navbar.Content>
            </Navbar>
            <LoginModal
                open={showLoginModal}
                setOpen={(o) => setShowLoginModal(o)}
                isSignUp={false}
            />
            <LoginModal
                open={showSignUpModal}
                setOpen={(o) => setShowSignUpModal(o)}
                isSignUp={true}
            />
        </React.Fragment>
    );
}
export default NavBar;