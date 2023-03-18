import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'
import { Button, Card, FormElement, Textarea } from '@nextui-org/react';
import SendIcon from '@mui/icons-material/Send';
import { PropsWithChildren, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { uFetch } from '@/utils/http';
import { RateResponse } from '@/components/modals/FeedbackModal';
import { getInitialChat } from '@/utils/user';
import { useSession } from 'next-auth/react';
import { KeyboardEvent } from 'react';
import { updateInput } from '@/utils/input';

interface MessageProps {
    from: 'user'|'ai'
}

function Message({from, children}: PropsWithChildren<MessageProps>) {
    let message = children;
    if (typeof children === "undefined" || children === null) {
        message = "";
    } else {
        message = `${children}`;
    }
    return (
        <>
        <div className={`message ${styles["message"]} ${styles[from]}`}>
            <pre>{children}</pre>
        </div>
        {
            from === 'ai'? <RateResponse message={String(message)} template="chat-sandbox"/> : null
        }
        </>
    )
}

function TypingDots() {
    return <div  id="typing-dots" className={`${styles["message"]} ${styles["ai"]} ${styles["typing-dots"]}`}>
        <span>&#x2022;</span><span>&#x2022;</span><span>&#x2022;</span>
    </div>
}

interface ConversationMessage {
    from: 'user'|'ai'
    text: string
}

function Sandbox() {
    const {data: session} = useSession();
    const [userMessage, setUserMessage] = useState("");
    // @ts-ignore
    if(typeof global._conversationUuid === "undefined") {
        // @ts-ignore
        global._conversationUuid = uuid();
    }
    // @ts-ignore
    const conversationUuid = global._conversationUuid;
    const url = "/api/ai-for-u/sandbox-chatgpt"

    const [messages, setMessages] = useState<ConversationMessage[]>([]);
    const [loading, setLoading] = useState(false);

    const updateTextbox = (message: string) => {
        updateInput({
            selector: `.${styles['user-input-form']} textarea`,
            value: message,
            update: setUserMessage,
        })
    }

    const getAIMessage = (message: string) => {
        if(typeof document === "undefined") {
            return;
        }
        uFetch(url, {
            session,
            method: "POST",
            body: JSON.stringify({
                conversationUuid,
                userMessage: message
            })
        }).then(async response => {
            if(response.status >= 200 && response.status < 300) {
                const body = await response.json();
                messages.push({
                    text: body.gptResponse,
                    from: "ai"
                });
                setMessages([...messages]);
            }
        }).finally(() => {
            setLoading(false);
        })
    }
    if(messages.length === 0) {
        getInitialChat(session).then(gptResponse => {
            if(messages.length === 0) {
                messages.push({
                    text: gptResponse,
                    from: "ai"
                });
                setMessages([...messages]);
            }
        })
    }


    const send = (event?: any) => {
        event?.preventDefault && event?.preventDefault();
        if(loading || userMessage.trim().length === 0) {
            return;
        }
        setLoading(true);

        messages.push({
            text: userMessage,
            from: 'user'
        })
        setMessages([...messages])
        updateTextbox("")

        getAIMessage(userMessage);
    }

    useEffect(() => {
        const els = document.getElementsByClassName('message')
        if (!els || !els.length) return;
        els[els.length - 1].scrollIntoView({behavior: "smooth"});
    }, [messages])

    const fillExample = (example: string) => {
        updateTextbox(example)
    }

    const [rows, setRows] = useState(1);
    const onKeyDown = (event: KeyboardEvent<FormElement>) => {
        if(event.key === "Enter") {
            if(event.ctrlKey) {
                (event.target as HTMLTextAreaElement).value = (event.target as HTMLTextAreaElement).value + "\n";
            }
            else {
                event.preventDefault();
                const form: HTMLFormElement|null = document.querySelector(`form.${styles['user-input-form']}`);
                if(form) {
                    form.requestSubmit();
                    return;
                }
            }
        }
    }

    const resizeRows = (event: KeyboardEvent<FormElement>) => {
        const newRows = (event.target as HTMLTextAreaElement).value.split("\n").length;
        if(newRows != rows) {
            setRows(newRows);
        }
    }

    return (
        <Layout>
            <Template isSandbox={true} exampleUrl="/api/ai-for-u/sandbox-chatgpt-examples" fillExample={fillExample}>
                <Card variant="bordered" className={styles["chat-box"]}>
                <Card.Body className={styles["chat-box-messages"]}>
                    {
                        messages.map((m, i) => <Message from={m.from} key={i}>{m.text}</Message>)
                    }
                    {loading ? <TypingDots/> : null}
                </Card.Body>
                <Card.Footer>
                    <form className={styles['user-input-form']} onSubmit={send}>
                        <Textarea
                            fullWidth
                            minRows={1}
                            maxRows={5}
                            onChange={event => setUserMessage(event.target.value)}
                            onKeyDown={onKeyDown}
                            onKeyUp={resizeRows}
                            placeholder="Type your message..."
                        />
                        <Button
                            size="sm"
                            auto
                            className={styles['send-button']}
                            onPress={send}
                        >
                            <SendIcon shapeRendering='rounded'/>
                        </Button>
                    </form>
                </Card.Footer>
                </Card>
            </Template>
        </Layout>
    )
}

export default Sandbox;