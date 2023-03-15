import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'
import { Button, Card, Input, Text, useInput } from '@nextui-org/react';
import SendIcon from '@mui/icons-material/Send';
import { PropsWithChildren, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { uFetch } from '@/utils/http';
import Image from 'next/image';
import FeedbackModal from '@/components/modals/FeedbackModal';

interface MessageProps {
    from: 'user'|'ai'
}

function Message({from, children}: PropsWithChildren<MessageProps>) {
    const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false)
    let message = children;
    if (typeof children === "undefined" || children === null) {
        message = "";
    } else {
        message = `${children}`;
    }
    return (
        <>
        <div className={`message ${styles["message"]} ${styles[from]}`}>
            {children}
        </div>
        {
            from === 'ai'?
            <>
            <div>
                <span
                    className={styles["rate-btn"]}
                    onClick={() => setShowFeedbackModal(true)}
                >
                    Rate this response?
                </span>
            </div>
            <FeedbackModal
                open={showFeedbackModal}
                setOpen={setShowFeedbackModal}
                message={`${message}`}
                template="chat-sandbox"
            /></> : null
        }
        </>
    )
}

function TypingDots() {
    return <svg width="100" height="40" viewBox="0 0 100 50">
        <path d="M10,30 h85 q5,0 5,-5
        v-10 q0,-5 -5,-5
        h-80 q-5,0 -5,5
        z" stroke="#ddd" fill="#ddd" strokeWidth="20"></path>
        <circle className={styles["dot"]} cx="25" cy="20" r="5" fill="#000000"></circle>
        <circle className={styles["dot"]} cx="50" cy="20" r="5" fill="#000000"></circle>
        <circle className={styles["dot"]} cx="75" cy="20" r="5" fill="#000000"></circle>
    </svg>
}

interface ConversationMessage {
    from: 'user'|'ai'
    text: string
}

function Sandbox() {
    const { value: userMessage, reset, bindings: userInputBindings } = useInput("");
    const conversationUuid = uuid();
    const url = "/api/ai-for-u/sandbox-chatgpt"

    const [messages, setMessages] = useState<ConversationMessage[]>([]);

    const getAIMessage = (message: string) => {
        if(typeof document === "undefined") {
            return;
        }
        const typingDots = document.querySelector("#typing-dots");
        const sendBtn = document.querySelector(`.${styles["send-button"]}`);
        if(sendBtn) {
            sendBtn.setAttribute("disabled", "true");

        }
        if(typingDots) {
            typingDots.removeAttribute("hidden");
        }
        uFetch(url, {
            method: "POST",
            body: JSON.stringify({
                conversationUuid,
                userMessage: message
            })
        }).then(async response => {
            const body = await response.json();
            messages.push({
                text: body.gptResponse,
                from: "ai"
            });
            setMessages([...messages]);
            reset();
        }).finally(() => {
            if(sendBtn) {
                sendBtn.removeAttribute("disabled");
            }
            if(typingDots) {
                typingDots.setAttribute("hidden", "");
            }
        })
    }
    if(messages.length === 0) {
        getAIMessage("");
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
                        <div id="typing-dots" hidden >
                            <TypingDots/>
                        </div>

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