import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'
import { Button, Card, Input, Text, useInput } from '@nextui-org/react';
import SendIcon from '@mui/icons-material/Send';
import { PropsWithChildren, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { uFetch } from '@/utils/http';

interface MessageProps {
    from: 'user'|'ai'
}

function Message(props: PropsWithChildren<MessageProps>) {
    return (
        <div className={`message ${styles["message"]} ${styles[props.from]}`}>
            {props.children}
        </div>
    )
}

interface ConversationMessage {
    from: 'user'|'ai'
    text: string
}

function Sandbox() {
    const { value: userMessage, reset, bindings: userInputBindings } = useInput("");
    const conversationUuid = uuid();
    const url = "/api/ai-for-u/sandbox-chatgpt"

    const [messages, setMessages] = useState<ConversationMessage[]>([
        {
            text: "Hey, yo. I'm an AI",
            from: "ai"
        }
    ])

    const getAIMessage = (message: string) => {
        if(typeof document === "undefined") {
            return;
        }
        const sendBtn = document.querySelector(`.${styles["send-button"]}`);
        if(sendBtn) {
            sendBtn.setAttribute("disabled", "true");
        }
        uFetch(url, {
            method: "POST",
            body: JSON.stringify({
                conversationUuid,
                userMessage
            })
        }).then(async response => {
            const body = await response.json();
            messages.push({
                text: body.gptResponse,
                from: "ai"
            });
            setMessages(messages);
            reset();
        }).finally(() => {
            if(sendBtn) {
                sendBtn.removeAttribute("disabled");
            }
        })
    }


    const send = (event?: any) => {
        event?.preventDefault && event?.preventDefault()

        messages.push({
            text: userMessage,
            from: 'user'
        })
        setMessages([...messages])

        reset()
        getAIMessage(userMessage);
    }

    useEffect(() => {
        const els = document.getElementsByClassName('message')
        if (!els || !els.length) return;
        els[els.length - 1].scrollIntoView({behavior: "smooth"});
    }, [messages])

    return (
        <Layout>
            <Template isSandbox={true}>
                <Card variant="bordered" className={styles["chat-box"]}>
                <Card.Body className={styles["chat-box-messages"]}>
                    {
                        messages.map((m, i) => <Message from={m.from} key={i}>{m.text}</Message>)
                    }
                </Card.Body>
                <Card.Footer>
                    <form className={styles['user-input-form']} onSubmit={send}>
                        <Input
                            {...userInputBindings}
                            fullWidth
                            contentRightStyling={false}
                            placeholder="Type your message..."
                            contentRight={
                                <Button
                                    size="sm"
                                    auto
                                    className={styles['send-button']}
                                    onClick={send}>
                                    <SendIcon fontSize='inherit' shapeRendering='rounded' />
                                </Button>
                            }
                        />
                    </form>
                </Card.Footer>
                </Card>
            </Template>
        </Layout>

    )
}

export default Sandbox;