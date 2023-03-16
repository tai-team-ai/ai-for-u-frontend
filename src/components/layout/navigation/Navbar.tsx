import React, {useState} from "react";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { constants, routes } from "../../../utils/constants";
import LoginModal from "../../modals/LoginModal";
import { useSession, signOut } from "next-auth/react";
import styles from '@/styles/Navbar.module.css';
import { getUserID } from "@/utils/user";

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
    getUserID(session);

    const sandboxActive = typeof window !== 'undefined' && window.location.pathname == routes.SANDBOX;
    const templatesActive = typeof window !== 'undefined' && window.location.pathname == routes.TEMPLATES;

    const navbarItems = [{
        text: "Sandbox",
        href: routes.SANDBOX,
        isActive: sandboxActive
    }, {
        text: "Templates",
        href: routes.TEMPLATES,
        isActive: templatesActive
    }, {
        text: "Go Pro",
        href: "#",
        isActive: false
    }]

    return (
        <React.Fragment>
            <Navbar isBordered variant="floating">
                <Navbar.Brand>
                    <Navbar.Toggle showIn="sm" aria-label="toggle navigation" />
                    <Text hideIn="sm">
                        <Link href={routes.ROOT}>
                            <img className={styles['logo']} src="/logo-full.png"></img>
                        </Link>
                    </Text>
                    <Text showIn="sm">
                        <Link href={routes.ROOT}>
                            <img className={styles['logo']} src="/logo-a.png"></img>
                        </Link>
                    </Text>
                </Navbar.Brand>
                <Navbar.Content hideIn="sm">
                    {navbarItems.map((nav, idx) => (
                        <Navbar.Link key={idx} isActive={nav.isActive} href={nav.href}>{nav.text}</Navbar.Link>
                    ))}
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
                <Navbar.Collapse showIn="sm">
                    {navbarItems.map((nav, idx) => (
                        <Navbar.CollapseItem key={idx}>
                            <Link
                                color="inherit"
                                css={{
                                    minWidth: "100%",
                                }}
                                href={nav.href}
                            >
                                {nav.text}
                            </Link>
                        </Navbar.CollapseItem>
                    ))}
                </Navbar.Collapse>
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