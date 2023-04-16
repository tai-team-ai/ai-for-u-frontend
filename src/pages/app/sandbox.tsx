import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'
import { Button, Card, Loading, Textarea, Text, useTheme } from '@nextui-org/react'
import SendIcon from '@mui/icons-material/Send'
import { type ReactNode, useEffect, useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { uFetch } from '@/utils/http'
import { RateResponse } from '@/components/modals/FeedbackModal'
import { getInitialChat } from '@/utils/user'
import { useSession } from 'next-auth/react'
import Markdown from 'markdown-to-jsx'
import { showSnackbar } from '@/components/elements/Snackbar'

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
    bkgdColor = from === 'ai' ? theme.colors.gray100.value : '$colors$primary'
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
  const { data: session } = useSession()
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const conversationUuid = getConversationUuid()
  const chatBoxRef = useRef<HTMLDivElement>(null)

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
      chatBoxRef.current.lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }
  }, [messages])

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
                    style={{
                      height: '100%'
                    }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      // @ts-expect-error the eventTarget could be anything but we know it's a form with custom types that arent' resolved at type checkig time.
                      const userMessage = e.target.userMessage.value
                      // @ts-expect-error the eventTarget could be anything but we know it's a form with custom types that arent' resolved at type checkig time.
                      e.target.userMessage.value = ''
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
                              setLoading(false)
                            })
                          } else if (response.status === 429) {
                            void response.json().then(data => {
                              showSnackbar(data.message)
                              setLoading(false)
                            })
                          } else {
                            void response.text().then(data => {
                              showSnackbar(data)
                              setLoading(false)
                            })
                          }
                        })
                    }}
                >
                    <Card css={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
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
                            />
                            <Button
                              size="sm"
                              auto
                              className={`${styles['send-button']} ${styles['send-button-hover']}`}
                              type="submit"
                            >
                                <SendIcon shapeRendering='rounded' />
                            </Button>
                        </Card.Footer>
                    </Card>
                </form>
            </Template>
        </Layout>
    </>)
}

export default ChatGPT
