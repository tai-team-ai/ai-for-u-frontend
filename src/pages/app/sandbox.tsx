import Layout from '@/components/layout/layout'
import Template, { type ExampleObject } from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'
import { Button, Card, Loading, Textarea, Text, useTheme } from '@nextui-org/react'
import SendIcon from '@mui/icons-material/Send'
import { type ReactNode, useEffect, useState, useRef, useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { uFetch } from '@/utils/http'
import { RateResponse } from '@/components/modals/FeedbackModal'
import { getExamples, getTokenExhaustedCallToAction } from '@/utils/user'
import { useSession } from 'next-auth/react'
import Markdown from '@/components/elements/Markdown'
import { SnackBarContext } from '@/components/elements/SnackbarProvider'
import { isMobileKeyboardVisible, useAutoCollapseKeyboard, isMobile } from '@/utils/hooks'
import GoProModal from '@/components/modals/GoProModal'
import LoginModal from '@/components/modals/LoginModal'
import { type GetStaticProps } from 'next'

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

declare interface ChatGPTProps {
  examples: ExampleObject[]
}

const ChatGPT = ({ examples }: ChatGPTProps): JSX.Element => {
  const { addAlert } = useContext(SnackBarContext)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { data: session } = useSession()
  const [messages, updateMessages] = useState<MessageProps[]>([])
  const setMessages = (inputMessages: MessageProps[]): void => {
    updateMessages(inputMessages)
    sessionStorage.setItem('conversation', JSON.stringify(inputMessages))
  }
  const [loading, setLoading] = useState<boolean>(false)
  const [showLogin, setShowLogin] = useState<boolean>(false)
  let conversationUuid = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('conversationUuid') : null
  // const [conversationUuid, setConversationUuid] = useState<string|null>(null)
  // // @ts-expect-error the global type doesn't have these types but we are using them for custom behaviour.
  // let conversationUuid: string = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('conversationUuid') : null// global._conversationUuid
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const isKeyboardVisible = isMobileKeyboardVisible()
  const isMobileBrowser = isMobile()
  const [callToActionMessage, setCallToActionMessage] = useState<string>('')
  const [showGoPro, setShowGoPro] = useState<boolean>(false)
  const maxLinesTextArea = 5

  const getResponse = async (request: RequestBody): Promise<void> => {
    setLoading(true)
    void uFetch('/api/ai-for-u/sandbox-chatgpt', { method: 'POST', body: JSON.stringify(request) })
      .then(response => {
        if (response.status === 200) {
          void response.json().then(data => {
            messages.push({
              request,
              response: data
            })
            setMessages([...messages])
          })
        } else {
          if (response.status === 429) {
            void response.json().then(body => {
              const errorBody = JSON.parse(body.message)
              const canLoginToContinue = Boolean(errorBody.login)
              setCallToActionMessage(getTokenExhaustedCallToAction(canLoginToContinue))
              if (canLoginToContinue) {
                setShowLogin(true)
              } else {
                setShowGoPro(true)
              }
            })
          } else if (response.status === 504 || response.status === 502 || response.status === 501) {
            addAlert('Our AI is currently helping too many people. Please try again in a few minutes or shorten the length of your message.')
          } else {
            void response.text().then(data => {
              addAlert(data)
            })
          }
          messages.pop()
          setMessages([...messages])
          if (textAreaRef.current !== null) {
            textAreaRef.current.value = request.userMessage
          }
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (typeof session === 'undefined') {
      return
    }
    conversationUuid = sessionStorage.getItem('conversationUuid')
    if (conversationUuid == null) {
      conversationUuid = uuid()
      void getResponse({ conversationUuid, userMessage: '' })
    }
    sessionStorage.setItem('conversationUuid', conversationUuid)
    const conversation = sessionStorage.getItem('conversation')
    if (conversation !== null) {
      setMessages([...JSON.parse(conversation)])
    } else {
      void getResponse({ conversationUuid, userMessage: '' })
    }
  }, [session, conversationUuid])

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
    const request = { conversationUuid: conversationUuid as string, userMessage }
    messages.push({ request })
    setMessages([...messages])
    void getResponse(request)
  }

  useAutoCollapseKeyboard(submitHandler)

  return (<>
        <Layout prefetchChat={false}>
        <Template
            isSandbox={true}
            examples={examples}
            fillExample={(e) => {
              const textfield: HTMLTextAreaElement | null = document.querySelector('#userMessage')
              if (textfield != null) {
                textfield.value = e
              }
            }}
          >
                <form
                    style={{ marginTop: '1rem' }}
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
                            maxRows={maxLinesTextArea}
                            cacheMeasurements={false}
                            fullWidth
                            form="task-form"
                            placeholder="Type your message..."
                            className={`${styles['user-message-textarea']} ${styles['user-message-textarea-hover']}`}
                            ref={textAreaRef} // Set a ref to the text area element
                            onKeyDown={(event: any) => { // this handles adding newlines and resizing the textarea when ctrl + enter or shift + enter or meta + enter is pressed
                              const lineHeight = 20 // Set the line height in pixels (you can adjust this value)
                              if (
                                ((event.ctrlKey as boolean) || (event.shiftKey as boolean) || (event.metaKey as boolean)) &&
                                event.key === 'Enter'
                              ) {
                                event.preventDefault()
                                if (textAreaRef.current != null) {
                                  const newValue = textAreaRef.current.value + '\n'
                                  textAreaRef.current.value = newValue
                                  // Count the number of lines in the textarea
                                  const lines = textAreaRef.current.value.split('\n').length
                                  // Manually adjust the height of the textarea based on the number of lines
                                  textAreaRef.current.style.height = 'auto'
                                  const newHeight = lines * lineHeight
                                  textAreaRef.current.style.height =
                                    lines <= maxLinesTextArea ? `${newHeight}px` : `${maxLinesTextArea * lineHeight}px`
                                  // Add this block to set the focus back to the textarea with a slight delay
                                  setTimeout(() => {
                                    if (textAreaRef.current != null) {
                                      textAreaRef.current.focus()
                                    }
                                  }, 0)
                                }
                              } else if (event.key === 'Enter') {
                                event.preventDefault()
                                const form: HTMLFormElement | null = document.querySelector('#task-form')
                                if (form != null) {
                                  form.requestSubmit()
                                }
                              }
                            }}
                          />
                            <Button
                              size="sm"
                              auto
                              className={`${styles['send-button']} ${styles['send-button-hover']}`}
                              type="submit"
                              color='primary'
                              aria-label="send button"
                            >
                                <SendIcon shapeRendering='rounded' />
                            </Button>
                            <Button
                              size="sm"
                              auto
                              color="error"
                              onPress={() => {
                                setMessages([])
                                sessionStorage.removeItem('conversationUuid')
                                conversationUuid = null
                              }}
                              >
                                Reset
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
              isSignUp={false}
              message={callToActionMessage}
            />
        </Layout>
    </>)
}

export const getStaticProps: GetStaticProps<ChatGPTProps> = async ({ params }) => {
  const examples: ExampleObject[] = await getExamples('sandbox-chatgpt')
  return {
    props: {
      examples
    }
  }
}

export default ChatGPT
