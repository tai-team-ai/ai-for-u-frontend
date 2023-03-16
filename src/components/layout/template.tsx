import styles from '@/styles/Template.module.css'
import {routes} from '@/utils/constants'
import { uFetch } from '@/utils/http'
import { Card, Grid, Text } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { PropsWithChildren, useState } from 'react'
import { getExamples } from '@/utils/user'


interface TemplateProps {
    isSandbox?: boolean
    children?: React.ReactNode,
    exampleUrl?: string | null
    fillExample?: ((e: any) => void) | null
}

interface ExampleObject {
    name: string;
    example: any;
}

interface ExampleProps {
    example: any;
    fillExample: ((e: any) => void) | null
}

const Example = ({example, fillExample, ...props}: PropsWithChildren<ExampleProps>) => {
    return (
        <>
        <Card
                isPressable
                isHoverable
                variant="bordered"
                className={styles["template-card"]}
                disableRipple={true} // if this page is turned into a single page app, then we'd want to enable this again
                css={{ h: "$24", $$cardColor: '$colors$primary' }}
                onPress={() => {fillExample ? fillExample(example) : null}}
                >
                    <Card.Body css={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
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


export default function Template({isSandbox = false, children = null, exampleUrl = null, fillExample = null}: TemplateProps) {
    const {data: session} = useSession();
    const [examples, setExamples] = useState<ExampleObject[]>([]);
    const [loading, setLoading] = useState(false);

    if(exampleUrl && !loading) {
        setLoading(true)
        getExamples(session, exampleUrl)
            .then(data => {
                if(typeof data.exampleNames !== "undefined") {
                    for(let i = 0;i < data.exampleNames.length;i++) {
                        examples.push({
                            name: data.exampleNames[i],
                            example: data.examples[i],
                        })
                    }
                    setExamples([...examples]);
                }
            })
    }

    return (
        <Grid.Container gap={1} direction="row-reverse">
            <Grid sm={9} xs={12}>
                <section className={styles["content"]}>
                    {isSandbox ? null : <Link style={{float:"right"}} href={routes.TEMPLATES}>X</Link>}
                    {children}
                    {isSandbox ? null : <Link href={routes.TEMPLATES}>Back to Templates</Link>}
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