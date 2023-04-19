import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Input, Loading, Image, Text, Card, Link } from '@nextui-org/react'
import EmailIcon from '@mui/icons-material/Email'
import { signIn } from 'next-auth/react'
import { validateSignUp } from '@/utils/validation'
import { uFetch } from '@/utils/http'

interface LoginModalProps {
  open: boolean
  setOpenState: (o: boolean) => void
  isSignUp: boolean
  error?: string | null
  message?: string | null
}

const LoginModal = ({ open, setOpenState, isSignUp, error = null, message = null }: LoginModalProps): JSX.Element => {
  const [loggingIn, setLoggingIn] = React.useState(false)
  const loginForm = useRef<HTMLFormElement>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [modalState, setModalState] = useState<'providers' | 'email'>('providers')
  const [isSignUpModal, setIsSignUpState] = useState<boolean>(isSignUp)

  useEffect(() => {
    setIsSignUpState(isSignUp)
  }, [isSignUp])

  useEffect(() => {
    if (open) {
      setModalState('providers')
      setErrorMessage(error ?? '')
    }
  }, [open])

  const submitLoginForm = async (event?: any): Promise<void> => {
    if (loginForm.current == null) return
    event.preventDefault()

    setLoggingIn(true)
    try {
      const formData = new FormData(loginForm.current)
      const formDataJSON = Object.fromEntries(formData)
      const email = String(formDataJSON.email)
      const password = String(formDataJSON.password)

      if (isSignUpModal) {
        const confirmPassword = String(formDataJSON.confirmPassword)
        const errors = validateSignUp({ email, password, confirmPassword })
        if (errors.length > 0) {
          setErrorMessage(errors.join('<br/>'))
          return
        }
        const signUpResponse = await uFetch(
          '/api/auth/signup',
          {
            session: null,
            method: 'POST',
            body: JSON.stringify({ email, password, confirmPassword })
          })
        if (signUpResponse.status === 422) {
          const { message } = await signUpResponse.json()
          setErrorMessage(message.replace('\n', '<br/>'))
          return
        }
      }

      const signInResponse = await signIn('credentials', { email, password, redirect: false })
      if (typeof signInResponse !== 'undefined' && signInResponse.ok) {
        setOpenState(false)
      } else {
        setErrorMessage('Invalid email or password')
        return
      }
    } finally {
      setLoggingIn(false)
    }
  }

  const getContentEmail = (): JSX.Element => {
    return (
            <form ref={loginForm} id="loginForm" onSubmit={(event) => { void submitLoginForm(event) }}>
                    <Input
                        required
                        fullWidth
                        label="Email"
                        placeholder=""
                        initialValue=""
                        inputMode="email"
                        name="email"
                    />
                    <Input.Password
                        fullWidth
                        required
                        label="Password"
                        placeholder=""
                        initialValue=""
                        name="password"
                    />
                    {isSignUpModal
                      ? <Input.Password
                        fullWidth
                        required
                        label="Confirm Password"
                        placeholder=""
                        initialValue=""
                        name="confirmPassword"
                    />
                      : ''
                    }
                    <Button
                        style={{ width: '100%' }}
                        type="submit"
                        disabled={loggingIn}
                        form="loginForm"
                        css={{ marginTop: '1em' }}
                    >
                        {loggingIn
                          ? (
                            <Loading type="points" />
                            )
                          : (
                              isSignUpModal ? 'Signup' : 'Login'
                            )}
                    </Button>
                </form>
    )
  }

  const getContentProviders = (): JSX.Element => {
    return (
            <>
                <Button
                    onPress={() => { setModalState('email') }}
                    className="email-login-btn"
                    bordered
                    size="lg"
                    iconLeftCss={{ left: '12px' }}
                    icon={<EmailIcon shapeRendering='rounded' />}
                >
                    {isSignUpModal ? 'Sign up with Email' : 'Login with Email'}
                </Button>
                <Button
                    onPress={() => { void signIn('google') }}
                    className="google-login-btn"
                    bordered
                    size="lg"
                    iconLeftCss={{ left: '0' }}
                    icon={<Image src="/btn_google_light_normal_ios.svg"/>}
                >
                    {isSignUpModal ? 'Sign up with Google' : 'Login with Google'}
                </Button>
            </>
    )
  }

  return (
        <Modal
            open={open}
            closeButton
            onClose={() => {
              setOpenState(false)
              if (window.location.toString() !== window.location.toString().split('?')[0]) {
                window.location.replace(window.location.toString().split('?')[0])
              }
            }}
            css={{
              maxWidth: '90vw',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
        >
              <Modal.Header>
                  {message === null
                    ? null
                    : (
                        <Text h3 color='secondary' >
                            {message}
                        </Text>
                      )
                }
              </Modal.Header>
                <Modal.Body css={{ marginTop: '-1rem' }}>
                <Card
                    variant="bordered"
                    css={{
                      background: '$red100',
                      borderColor: '$red700',
                      display: errorMessage.length > 0 ? 'block' : 'none'
                    }}>
                    <Card.Body>
                        <Text css={{ color: '$red700' }} dangerouslySetInnerHTML={{ __html: errorMessage }} />
                    </Card.Body>
                </Card>
                    {modalState === 'providers'
                      ? (
                          getContentProviders()
                        )
                      : ('')}
                    {modalState === 'email'
                      ? (
                          getContentEmail()
                        )
                      : ('')}
                      <Text h6 css={{ marginTop: '-0.6em', display: 'block', textAlign: 'center' }} color='secondary'>
                        <Link onClick={() => { setIsSignUpState(!isSignUpModal) }} style={{ color: 'inherit' }}>
                          {isSignUpModal ? 'Already have an account?' : 'Don\'t have an account?'}
                        </Link>
                      </Text>
                </Modal.Body>
        </Modal>
  )
}
export default LoginModal
