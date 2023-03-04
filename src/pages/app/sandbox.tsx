import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'
import { Button, Card, Input, Text, useInput } from '@nextui-org/react';
import SendIcon from '@mui/icons-material/Send';
import { PropsWithChildren, useState } from 'react';

interface MessageProps {
    from: 'user'|'ai'
}

function Message(props: PropsWithChildren<MessageProps>) {
    return (
        <div className={`${styles["message"]} ${styles[props.from]}`}>
            {props.children}
        </div>
    )
}

interface ConversationMessage {
    from: 'user'|'ai'
    text: string
}

function Sandbox() {
    const { value: userInput, reset, bindings: userInputBindings } = useInput("");
    const [messages, setMessages] = useState<ConversationMessage[]>([
        {
            text: "Hey, yo. I'm an AI",
            from: "ai"
        }
    ])

    const send = (event?: any) => {
        console.log("user sending message: " + userInput)
        event?.preventDefault && event?.preventDefault()

        messages.push({
            text: userInput,
            from: 'user'
        })
        setMessages(messages)

        reset()
    }

    return (
        <Layout>
            <Template isSandbox={true}>
                <Card variant="bordered" className={styles["chat-box"]}>
                <Card.Body className={styles["chat-box-messages"]}>
                    {
                        messages.map((m) => <Message from={m.from}>{m.text}</Message>)
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
                                    onPress={send}>
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