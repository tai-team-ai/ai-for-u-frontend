import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'
import { Button, Card, FormElement, Textarea } from '@nextui-org/react';
import SendIcon from '@mui/icons-material/Send';
import { FormEvent, PropsWithChildren, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { uFetch } from '@/utils/http';
import { RateResponse } from '@/components/modals/FeedbackModal';
import { getInitialChat } from '@/utils/user';
import { useSession } from 'next-auth/react';
import { KeyboardEvent } from 'react';
import Markdown from "markdown-to-jsx"

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
            <Markdown>{`${children}`}</Markdown>
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



    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        // @ts-ignore
        const userMessage = event.target.userMessage;
        if(loading || userMessage.value.trim().length === 0) {
            return;
        }
        setLoading(true);

        messages.push({
            text: userMessage.value,
            from: 'user'
        })
        setMessages([...messages])

        getAIMessage(userMessage.value);
        userMessage.value = "";
    }

    useEffect(() => {
        const els = document.getElementsByClassName('message')
        if (!els || !els.length) return;
        els[els.length - 1].scrollIntoView({behavior: "smooth"});
    }, [messages])

    const fillExample = (example: string) => {
        const userInput: HTMLTextAreaElement|null = document.querySelector("#userMessage");
        if(userInput) {
            userInput.value = example;
        }
    }

    const [rows, setRows] = useState(1);
    const onKeyDown = (event: KeyboardEvent<FormElement>) => {
        if(event.key === "Enter") {
            if(event.ctrlKey) {
                (event.target as HTMLTextAreaElement).value = (event.target as HTMLTextAreaElement).value + "\n";
            }
            else {
                event.preventDefault();
                const form: null|HTMLFormElement = document.querySelector("#task-form")
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
            <Template isSandbox={true} exampleUrl="/api/ai-for-u/sandbox-chatgpt-examples" fillExample={fillExample} handleSubmit={onSubmit}>
                <Card variant="bordered" className={styles["chat-box"]}>
                <Card.Body className={styles["chat-box-messages"]}>
                    {
                        messages.map((m, i) => <Message from={m.from} key={i}>{m.text}</Message>)
                    }
                    {loading ? <TypingDots/> : null}
                </Card.Body>
                <Card.Footer>
                    <Textarea
                        id="userMessage"
                        name="userMessage"
                        fullWidth
                        minRows={1}
                        maxRows={5}
                        onKeyDown={onKeyDown}
                        onKeyUp={resizeRows}
                        form="task-form"
                        placeholder="Type your message..."
                    />
                    <Button
                        size="sm"
                        auto
                        className={styles['send-button']}
                        type="submit"
                    >
                        <SendIcon shapeRendering='rounded'/>
                    </Button>
                </Card.Footer>
                </Card>
            </Template>
        </Layout>
    )
}

export default Sandbox;