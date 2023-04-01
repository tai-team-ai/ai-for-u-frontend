import React, {useEffect, useState} from "react";
import { Navbar, Button, Link, Text, useModal } from "@nextui-org/react";
import { constants, routes, errors } from "../../../utils/constants";
import LoginModal from "../../modals/LoginModal";
import { useSession, signOut } from "next-auth/react";
import styles from '@/styles/Navbar.module.css';
import { getUserID } from "@/utils/user";
import { useRouter } from "next/router";
import GoProModal from "@/components/modals/GoProModal";

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
        <Navbar.Link>
            <Button auto flat onPress={() => signOut()}>
                Logout
            </Button>
        </Navbar.Link>
    )
}

interface NavBarProps {

}

const NavBar = ({}: NavBarProps) => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
    const {data: session} = useSession();
    const {setVisible: setShowGoProModal, bindings: goProBindings} = useModal();
    getUserID(session);
    const [error, setError] = useState("");
    const router = useRouter()
    useEffect(()=>{
        const errorMessage = router.query.error;
        if(typeof errorMessage === "string") {
            // @ts-ignore
            const msg = typeof errors[errorMessage] !== "undefined" ? errors[errorMessage] : errorMessage
            setError(msg);
            setShowLoginModal(true);
        }
    })

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
        onPress: () => setShowGoProModal(true),
        isActive: false
    }]

    return (
        <React.Fragment>
            <Navbar isBordered variant="floating" css={{
                zIndex: "500"
            }}>
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
                    {navbarItems.map((nav, idx) => {
                            return (
                                <Navbar.Link
                                    key={idx}
                                    isActive={nav.isActive}
                                    href={nav.href}
                                    onPress={nav.onPress}
                                >{nav.text}</Navbar.Link>)
                    })}
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
                error={error}
            />
            <LoginModal
                open={showSignUpModal}
                setOpen={(o) => setShowSignUpModal(o)}
                isSignUp={true}
                error={error}
            />
            <GoProModal bindings={goProBindings} />
        </React.Fragment>
    );
}
export default NavBar;