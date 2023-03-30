import styles from '@/styles/Template.module.css'
import { routes } from '@/utils/constants'
import { Card, Grid, Text, Loading, Button } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Dispatch, FormEventHandler, PropsWithChildren, SetStateAction, useEffect, useRef, useState } from 'react'
import { getExamples } from '@/utils/user'
import { RateResponse, ResponseProps } from '../modals/FeedbackModal'



interface ExampleObject {
    name: string;
    example: any;
}

interface ExampleProps {
    example: any;
    fillExample: ((e: any) => void) | null
}

const Example = ({ example, fillExample, ...props }: PropsWithChildren<ExampleProps>) => {
    return (
        <>
            <Card
                isPressable
                isHoverable
                variant="bordered"
                className={styles["template-card"]}
                disableRipple={true} // if this page is turned into a single page app, then we'd want to enable this again
                css={{ h: "$24", $$cardColor: '$colors$primary' }}
                onPress={() => { fillExample ? fillExample(example) : null }}
            >
                <Card.Body css={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Text
                        size="$xl"
                        weight="bold"
                        color="white" >
                        {props.children}
                    </Text>
                </Card.Body>
            </Card>
        </>
    )
}

interface ResultBoxProps {
    showResult: boolean
    loading: boolean
    responseProps: ResponseProps
}

export function ResultBox({ showResult, loading, responseProps, children }: PropsWithChildren<ResultBoxProps>) {
    return (
        <>
            {
                showResult && !loading ?
                    <>
                        <div className={styles["result-box"]}>
                            {children}
                        </div>
                        <RateResponse {...responseProps} />
                    </> :
                    null
            }
        </>
    )
}


interface TemplateProps {
    isSandbox?: boolean
    children?: React.ReactNode,
    exampleUrl?: string | null
    fillExample?: ((e: any) => void) | null
    handleSubmit?: FormEventHandler | null
    formLoading?: boolean
    setShowResult?: Dispatch<SetStateAction<boolean>> | null
    resultBox?: JSX.Element | null
    fillMapping?: {[name: string]: (v: any) => void} | null
    defaults?: [(a: any) => void, any][] | null;
}

export default function Template({ isSandbox = false, children = null, exampleUrl = null, fillExample = null, handleSubmit = null, formLoading = false, setShowResult = null, resultBox = null, fillMapping = null, defaults = null}: TemplateProps) {
    const { data: session } = useSession();
    const [examples, setExamples] = useState<ExampleObject[]>([]);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef<HTMLElement>(null)

    if (typeof exampleUrl !== "undefined" && exampleUrl && !loading) {
        setLoading(true)
        getExamples(session, exampleUrl)
            .then(data => {
                if (typeof data.exampleNames !== "undefined") {
                    for (let i = 0; i < data.exampleNames.length; i++) {
                        examples.push({
                            name: data.exampleNames[i],
                            example: data.examples[i],
                        })
                    }
                    setExamples([...examples]);
                }
            })
    }

    if (!fillExample) {
        fillExample = (example) => {
            for (const key of Object.keys(example)) {
                let target: HTMLInputElement | null = document.querySelector(`input[name=${key}],textarea[name=${key}],select[name=${key}]`);
                if (target) {
                    if (example.hasOwnProperty(key)) {
                        target.value = example[key];
                        if (typeof example[key] === "boolean") {
                            target.checked = example[key];
                        }
                    }
                }
                if(fillMapping && typeof fillMapping[key] !== "undefined") {
                    fillMapping[key](example[key]);
                }
            }
        }
    }

    const resizeChat = () => {
        if (!isSandbox || !sectionRef.current) return

        sectionRef.current.style.height = '';
        const chatRect = sectionRef.current!.getBoundingClientRect()
        const initialHeight = chatRect.height
        const sectionTop = chatRect.top;
        const footerTop = document.getElementsByTagName('footer')[0].getBoundingClientRect().top;

        const newHeight = footerTop - sectionTop - 24;
        if (newHeight > initialHeight) {
            sectionRef.current.style.height = `${newHeight}px`;
        }
    }

    useEffect(() => {
        window.addEventListener('resize', resizeChat)

        return () => {
            window.removeEventListener('resize', resizeChat)
        }
    })

    useEffect(() => {
        resizeChat()
    }, [])

    return (
        <Grid.Container gap={1} direction="row-reverse" css={{position: 'relative'}}>
            <Grid sm={9} xs={12}>
                <section ref={sectionRef} className={`${styles["content"]} ${isSandbox ? styles['sandbox'] : ''}`}>
                    <form
                        id="task-form"
                        className={styles['task-form']}
                        onReset={(e) => {
                            setShowResult ? setShowResult(false) : null;
                            if(defaults) {
                                defaults.forEach(([setValue, value]) => {
                                    setValue(value);
                                })
                            }
                        }}
                        onSubmit={(e) => handleSubmit ? handleSubmit(e) : e.preventDefault()}
                        >
                        {children}

                        {isSandbox ? null :
                            <>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "1em" }}>
                                    <Button
                                        auto
                                        light
                                        color="error"
                                        type="reset"
                                        disabled={formLoading}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        auto
                                        flat
                                        disabled={formLoading}
                                        type="submit"
                                    >
                                        {formLoading ? <Loading type="points"/> : "Submit"}
                                    </Button>
                                </div>
                            </>}
                    </form>
                    {resultBox}
                </section>
            </Grid>
            <Grid sm={3} xs={12}>
                <section className={styles["example-section"]}>
                    <Text h2 className={styles["example-header"]}>
                        Examples
                    </Text>
                    <div className={styles["examples"]}>
                        <Grid.Container gap={1} justify='flex-start'>
                            {
                                examples.length > 0 ?
                                    examples.map((example) => {
                                        return <Example
                                            example={example.example}
                                            fillExample={fillExample}>
                                            {example.name}
                                        </Example>
                                    }) : "Examples coming soon..."
                            }
                        </Grid.Container>
                    </div>
                </section>
            </Grid>

        </Grid.Container>
    )
}