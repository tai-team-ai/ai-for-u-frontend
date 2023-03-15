import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Templates.module.css'
import {Card, Text} from '@nextui-org/react'


export const TemplateCards = [
    <TemplateCard
        href="/templates/resignation-letter"
        name="Resignation Letter" />,
    <TemplateCard
        href="/templates/notes-summarizer"
        name="Notes Summarizer" />,
]

interface TemplateCardProps {
    name: string
    href?: string
    onPress?: () => void
}

export default function TemplateCard({name, href = "#", onPress = () => {}}: TemplateCardProps) {
    return (
        <Link href={href} style={{width: "100%"}}>
            <Card
                isPressable
                isHoverable
                variant="bordered"
                className={styles["template-card"]}
                disableRipple={true} // if this page is turned into a single page app, then we'd want to enable this again
                css={{ h: "$24", $$cardColor: '$colors$primary' }}
                onPress={onPress}
                >
                    <Card.Body css={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                        <Text
                            size="$xl"
                            weight="bold"
                            color="white" >
                            {name}
                        </Text>
                    </Card.Body>
            </Card>
        </Link>
    )
}