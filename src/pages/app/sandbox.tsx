import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'
import { Button, Card, Loading, Textarea, Text, useTheme } from '@nextui-org/react'
import SendIcon from '@mui/icons-material/Send'
import { type ReactNode, useEffect, useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { uFetch } from '@/utils/http'
import { RateResponse } from '@/components/modals/FeedbackModal'
import { getInitialChat, getTokenExhaustedCallToAction } from '@/utils/user'
import { useSession } from 'next-auth/react'
import Markdown from 'markdown-to-jsx'
import { showSnackbar } from '@/components/elements/Snackbar'
import { isMobileKeyboardVisible, useAutoCollapseKeyboard, isMobile } from '@/utils/hooks'
import LoginModal from '@/components/modals/LoginModal'
import GoProModal from '@/components/modals/GoProModal'

interface RequestBody {
  conversationUuid: string
  userMessage: string
}

interface ResponseBody {
  gptResponse: string
}

interface MessageBubbleProps {
  text: string | ReactNode
  from: 'human' | 'ai'
}

const MessageBubble = ({ from, text }: MessageBubbleProps): JSX.Element => {
  const { theme } = useTheme()
  let bkgdColor = 'rgba(0, 0, 0, 0.15)'
  if (typeof theme !== 'undefined') {
    bkgdColor = from === 'ai' ? theme.colors.gray100.value : '$colors$primaryLightContrast'
  }
  const textColor = from === 'ai' ? 'black' : 'white'
  const borderRadius = '12px'
  const borderEndStartRadius = from === 'ai' ? '0' : borderRadius
  const borderEndEndRadius = from === 'human' ? '0' : borderRadius
  const alignItems = from === 'ai' ? 'flex-start' : 'flex-end'
  return (
        <div className='message' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems }}>
            <Text
                span
                className={styles['chat-box-messages']}
                css={{
                  backgroundColor: bkgdColor,
                  color: textColor,
                  borderRadius,
                  borderEndStartRadius,
                  borderEndEndRadius
                }}
            >
                {text}
            </Text>
        </div>
  )
}

interface MessageProps {
  request: RequestBody
  response?: ResponseBody | null
}

const Message = ({ request, response = null }: MessageProps): JSX.Element => {
  if (response != null) {
    return <div style={{ width: '100%' }}>
            <MessageBubble text={<Markdown>{response.gptResponse}</Markdown>} from="ai" />
            <RateResponse aiResponseFeedbackContext={response} userPromptFeedbackContext={request} aiToolEndpointName="sandbox-chatgpt" />
        </div>
  }
  return <div style={{ width: '100%' }}>
        <MessageBubble text={<Markdown>{request.userMessage}</Markdown>} from="human" />
    </div>
}

const getConversationUuid = (): string => {
  // @ts-expect-error the global type doesn't have these types but we are using them for custom behaviour.
  if (typeof global._conversationUuid === 'undefined') {
    // @ts-expect-error the global type doesn't have these types but we are using them for custom behaviour.
    global._conversationUuid = uuid()
  }
  // @ts-expect-error the global type doesn't have these types but we are using them for custom behaviour.
  const conversationUuid = global._conversationUuid
  return conversationUuid
}

const ChatGPT = (): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { data: session } = useSession()
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const conversationUuid = getConversationUuid()
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const isKeyboardVisible = isMobileKeyboardVisible()
  const isMobileBrowser = isMobile()
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [callToActionMessage, setCallToActionMessage] = useState<string>('')
  const [showGoPro, setShowGoPro] = useState<boolean>(false)

  useEffect(() => {
    if (messages.length === 0) {
      setLoading(true)
      void getInitialChat(session).then(gptResponse => {
        if (messages.length === 0) {
          messages.push({
            request: {
              conversationUuid,
              userMessage: ''
            },
            response: {
              gptResponse
            }
          })
          setMessages([...messages])
          setLoading(false)
        }
      })
    }
  })

  useEffect(() => {
    if (chatBoxRef.current?.lastChild instanceof Element) {
      // Add a delay before scrolling
      if (isMobileBrowser) {
        const scrollTimeout = setTimeout(() => {
          if (chatBoxRef.current?.lastChild instanceof Element) {
            chatBoxRef.current.lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
          }
        }, 200) // Adjust the delay time as needed

        // Cleanup function to clear the timeout when the component unmounts or the effect is re-run
        return () => {
          clearTimeout(scrollTimeout)
        }
      } else {
        chatBoxRef.current.lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      }
    }
  }, [messages, loading])

  const submitHandler = (event: React.FormEvent<HTMLFormElement> | KeyboardEvent): void => {
    event.preventDefault()
    const userMessage = (event instanceof KeyboardEvent)
      ? (document.getElementById('userMessage') as HTMLInputElement).value
      : event.currentTarget.userMessage.value;
    (event instanceof KeyboardEvent)
      ? (document.getElementById('userMessage') as HTMLInputElement).value = ''
      : event.currentTarget.userMessage.value = ''
    const request = { conversationUuid, userMessage }
    messages.push({ request })
    setMessages([...messages])
    setLoading(true)
    void uFetch('/api/ai-for-u/sandbox-chatgpt', { session, method: 'POST', body: JSON.stringify(request) })
      .then(response => {
        if (response.status === 200) {
          void response.json().then(data => {
            messages.push({
              request,
              response: data
            })
            setMessages([...messages])
          })
        } else if (response.status === 429) {
          void response.json().then(data => {
            const isUserLoggedIn = session !== null
            setCallToActionMessage(getTokenExhaustedCallToAction(isUserLoggedIn))
            if (isUserLoggedIn) {
              setShowGoPro(true)
            } else {
              setShowLogin(true)
            }
          })
        } else {
          void response.text().then(data => {
            showSnackbar(data)
          })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useAutoCollapseKeyboard(submitHandler)

  return (<>
        <Layout>
        <Template
            isSandbox={true}
            exampleUrl="/api/ai-for-u/sandbox-chatgpt-examples"
            fillExample={(e) => {
              const textfield: HTMLTextAreaElement | null = document.querySelector('#userMessage')
              if (textfield != null) {
                textfield.value = e
              }
            }}
          >
                <form
                    id="task-form"
                    ref={formRef}
                    onSubmit={submitHandler}
                >
                    <Card css={{ height: isKeyboardVisible ? '20vh' : '80vh', display: 'flex', flexDirection: 'column' }} className={styles['sandbox-card']}>
                      <Card.Body ref={chatBoxRef} className={styles['chat-box']}>
                            {messages.map((message) => <Message {...message} />)}
                            {loading ? <MessageBubble from="ai" text={<Loading type="points" />}></MessageBubble> : null}
                        </Card.Body>
                        <Card.Footer
                            className={styles['sandbox-footer']}
                        >
                          <Textarea
                            animated={false}
                            id="userMessage"
                            name="userMessage"
                            minRows={1}
                            maxRows={5}
                            fullWidth
                            form="task-form"
                            placeholder="Type your message..."
                            className={`${styles['user-message-textarea']} ${styles['user-message-textarea-hover']}`}
                            onKeyDown={(event: any) => {
                              if (!(event.shiftKey as boolean) && event.key === 'Enter') {
                                event.preventDefault()
                                const form: HTMLFormElement | null = document.querySelector('#task-form')
                                if (form != null) {
                                  form.requestSubmit()
                                }
                              }
                            }}
                            ref={textAreaRef} // Set a ref to the text area element
                          />
                            <Button
                              size="sm"
                              auto
                              className={`${styles['send-button']} ${styles['send-button-hover']}`}
                              type="submit"
                              color='primary'
                            >
                                <SendIcon shapeRendering='rounded' />
                            </Button>
                        </Card.Footer>
                    </Card>
                </form>
            </Template>
            <GoProModal
              open={showGoPro}
              message={callToActionMessage}
              setOpenState={setShowGoPro}
            />
            <LoginModal
              open={showLogin}
              setOpenState={setShowLogin}
              signUp={true}
              message={callToActionMessage}
            />
        </Layout>
    </>)
}

export default ChatGPT
