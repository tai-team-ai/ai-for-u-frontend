import React, { useEffect, useState } from 'react'
import { Navbar, Button, Link, Text } from '@nextui-org/react'
import NextLink from 'next/link'
import { routes, errors } from '../../../utils/constants'
import LoginModal from '../../modals/LoginModal'
import { useSession, signOut } from 'next-auth/react'
import styles from '@/styles/Navbar.module.css'
import { getUserID } from '@/utils/user'
import { useRouter } from 'next/router'
import GoProModal from '@/components/modals/GoProModal'

interface LoginButtonProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginButtons = ({ setIsSignUp, setShowLoginModal }: LoginButtonProps): JSX.Element => {
  return (
        <>
            <Navbar.Link color="inherit" onClick={ () => {
              setIsSignUp(false)
              setShowLoginModal(true)
            }}>
                Login
            </Navbar.Link>
            <Navbar.Item>
                <Button auto flat onClick={ () => {
                  console.info('signup')
                  setIsSignUp(true)
                  setShowLoginModal(true)
                }}
                >
                Sign Up
                </Button>
            </Navbar.Item>
        </>
  )
}

const LogoutButtons = (): JSX.Element => {
  return (
        <Navbar.Link>
            <Button auto flat className={styles['sign-up-btn']} onPress={() => { void signOut() }}>
                Logout
            </Button>
        </Navbar.Link>
  )
}

const NavBar = (): JSX.Element => {
  const { data: session } = useSession()
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [showGoProModal, setShowGoProModal] = useState<boolean>(false)
  getUserID(session)
  const [error, setError] = useState('')
  const router = useRouter()
  useEffect(() => {
    const errorMessage = router.query.error
    if (typeof errorMessage === 'string') {
      const msg = typeof errors[errorMessage] !== 'undefined' ? errors[errorMessage] : errorMessage
      setError(msg)
      setShowLoginModal(true)
    }
  })

  const sandboxActive = typeof window !== 'undefined' && window.location.pathname === routes.SANDBOX
  const templatesActive = typeof window !== 'undefined' && window.location.pathname === routes.TEMPLATES

  const navbarItems = [{
    text: 'AI Assistant',
    href: routes.SANDBOX,
    isActive: sandboxActive,
    textColor: 'inherit'
  }, {
    text: 'AI Templates',
    href: routes.TEMPLATES,
    isActive: templatesActive,
    textColor: 'inherit'
  }, {
    text: 'Go Pro',
    onPress: () => { setShowGoProModal(true) },
    isActive: false,
    textColor: 'error'
  }]

  return (
        <React.Fragment>
            <Navbar isBordered variant="floating" css={{
              zIndex: '500',
              fontSize: '1.1rem'
            }}>
                <Navbar.Brand>
                    <Navbar.Toggle showIn="sm" aria-label="toggle navigation" />
                    <Text hideIn="sm">
                        <NextLink href={routes.ROOT}>
                            <img className={styles.logo} src="/logo-full.png"></img>
                        </NextLink>
                    </Text>
                    <Text showIn="sm">
                        <NextLink href={routes.ROOT}>
                            <img className={styles.logo} src="/logo-a.png"></img>
                        </NextLink>
                    </Text>
                </Navbar.Brand>
                <Navbar.Content hideIn="sm" css={{ marginLeft: '12%' }}>
                    {navbarItems.map((nav, idx) => {
                      const link = <Navbar.Link
                        key={idx}
                        isActive={nav.isActive}
                        color={nav.textColor as 'text' | 'inherit' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'}
                        onPress={nav.onPress}
                    >{nav.text}</Navbar.Link>
                      if (typeof nav.href !== 'undefined') {
                        return <NextLink href={nav.href} style={{ color: nav.isActive ? 'var(--primary-light)' : 'var(--primary)' }}>{nav.text}</NextLink>
                      } else {
                        return link
                      }
                    })}
                </Navbar.Content>
                <Navbar.Content>
                    {(session != null)
                      ? (
                        <LogoutButtons />
                        )
                      : (
                        <LoginButtons
                            setIsSignUp={setIsSignUp}
                            setShowLoginModal={setShowLoginModal}
                        />
                        )}
                </Navbar.Content>
                <Navbar.Collapse showIn="sm">
                    {navbarItems.map((nav, idx) => (
                        <Navbar.CollapseItem key={idx}>
                            {
                              typeof nav.href !== 'undefined'
                                ? <NextLink href={nav.href} style={{ minWidth: '100%', color: 'var(--primary)' }}>{nav.text}</NextLink>
                                : <Link
                                key={idx}
                                css={{ minWidth: '100%' }}
                                color={nav.textColor as 'text' | 'inherit' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'}
                                onPress={nav.onPress}
                              >{nav.text}</Link>
                            }
                        </Navbar.CollapseItem>
                    ))}
                </Navbar.Collapse>
            </Navbar>
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <LoginModal
                  open={showLoginModal}
                  setOpenState={setShowLoginModal}
                  isSignUp={isSignUp}
                  error={error}
              />
            </div>
            <GoProModal open={showGoProModal} setOpenState={setShowGoProModal} />
        </React.Fragment>
  )
}
export default NavBar
