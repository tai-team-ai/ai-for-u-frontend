import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'
import { Button, Card, FormElement, Loading, Textarea, Text, useTheme } from '@nextui-org/react';
import SendIcon from '@mui/icons-material/Send';
import { ReactNode, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { uFetch } from '@/utils/http';
import { RateResponse } from '@/components/modals/FeedbackModal';
import { getInitialChat } from '@/utils/user';
import { useSession } from 'next-auth/react';
import Markdown from "markdown-to-jsx"


interface RequestBody {
    conversationUuid: string
    userMessage: string
}


interface ResponseBody {
    gptResponse: string
}

interface MessageBubbleProps {
    text: string | ReactNode;
    from: "human" | "ai"
}


const MessageBubble = ({ from, text }: MessageBubbleProps) => {
    const { theme } = useTheme();
    let bkgdColor = "rgba(0, 0, 0, 0.15)";
    if (typeof theme !== "undefined") {
        bkgdColor = from === "ai" ? theme.colors.gray100.value : theme.colors.primary.value;
    }
    const textColor = from === "ai" ? "black" : "white";
    const borderRadius = "12px";
    const borderEndStartRadius = from === "ai" ? "0" : borderRadius;
    const borderEndEndRadius = from === "human" ? "0" : borderRadius;
    const alignItems = from === "ai" ? "flex-start" : "flex-end";
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems }}>
            <Text
                span
                css={{
                    display: "inline-block",
                    backgroundColor: bkgdColor,
                    color: textColor,
                    padding: "8px",
                    maxWidth: "80%",
                    margin: "4px 0",
                    borderRadius,
                    borderEndStartRadius,
                    borderEndEndRadius,
                }}
            >
                {text}
            </Text>
        </div>
    )
}


interface MessageProps {
    request: RequestBody;
    response?: ResponseBody | null;
}


const Message = ({ request, response = null }: MessageProps) => {
    if (response) {
        return <div style={{ width: "100%" }}>
            <MessageBubble text={<Markdown>{response.gptResponse}</Markdown>} from="ai" />
            <RateResponse aiResponseFeedbackContext={response} userPromptFeedbackContext={request} aiToolEndpointName="sandbox-chatgpt" />
        </div>
    }
    return <div style={{ width: "100%" }}>
        <MessageBubble text={<Markdown>{request.userMessage}</Markdown>} from="human" />
    </div>
}


const getConversationUuid = () => {
    // @ts-ignore
    if (typeof global._conversationUuid === "undefined") {
        // @ts-ignore
        global._conversationUuid = uuid();
    }
    // @ts-ignore
    const conversationUuid = global._conversationUuid;
    return conversationUuid;
}


const ChatGPT = () => {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const conversationUuid = getConversationUuid();

    if (messages.length === 0) {
        getInitialChat(session).then(gptResponse => {
            if (messages.length === 0) {
                messages.push({
                    request: {
                        conversationUuid: conversationUuid,
                        userMessage: "",
                    },
                    response: {
                        gptResponse,
                    }
                })
                setMessages([...messages]);
            }
        })
    }

    useEffect(() => {
        const els = document.getElementsByClassName('message')
        if (!els || !els.length) return;
        els[els.length - 1].scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (<>
        <Layout>
            <Template
                isSandbox={true}
                handleSubmit={(e) => {
                    e.preventDefault();
                    // @ts-ignore
                    const userMessage = e.target.userMessage.value;
                    // @ts-ignore
                    e.target.userMessage.value = "";
                    const request = { conversationUuid, userMessage };
                    messages.push({ request });
                    setMessages([...messages]);
                    setLoading(true);
                    uFetch("/api/ai-for-u/sandbox-chatgpt", {
                        session, method: "POST", body: JSON.stringify(request)
                    }).then(response => response.json())
                        .then(response => {
                            messages.push({
                                request,
                                response,
                            });
                            setMessages([...messages]);
                            setLoading(false);
                        })
                }}
                exampleUrl="/api/ai-for-u/sandbox-chatgpt-examples"
                fillExample={(e) => {
                    const textfield: HTMLTextAreaElement | null = document.querySelector("#userMessage");
                    if (textfield) {
                        textfield.value = e;
                    }
                }}
            >
                <Card>
                    <Card.Body>
                        {messages.map(((message) => <Message {...message} />))}
                        {loading ? <MessageBubble from="ai" text={<Loading type="points" />}></MessageBubble> : null}
                    </Card.Body>
                    <Card.Footer
                        css={{
                            position: "relative"
                        }}
                    >
                        <Textarea
                            id="userMessage"
                            name="userMessage"
                            minRows={1}
                            maxRows={4}
                            fullWidth
                            form="task-form"
                            placeholder="Type your message..."
                            css={{
                                whiteSpace: "pre-wrap",
                                filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))",
                                margin: 0
                            }}
                            onKeyDown={(event: KeyboardEvent) => {
                                if (!event.shiftKey && event.key === "Enter") {
                                    event.preventDefault();
                                    const form: HTMLFormElement | null = document.querySelector("#task-form");
                                    if (form) {
                                        form.requestSubmit();
                                    }
                                }
                            }}
                        />
                        <Button
                            size="sm"
                            auto
                            className={styles['send-button']}
                            type="submit"
                        >
                            <SendIcon shapeRendering='rounded' />
                        </Button>
                    </Card.Footer>
                </Card>
            </Template>
        </Layout>
    </>)
}

export default ChatGPT;
