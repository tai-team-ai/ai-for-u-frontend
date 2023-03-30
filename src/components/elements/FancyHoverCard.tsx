import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import styles from '@/styles/FancyHoverCard.module.css'
import {Card, Text} from '@nextui-org/react'

interface FancyHoverCardProps {
    size?: 'sm'|'lg'
    title: string
    description: string
    hover: string
}

export default function FancyHoverCard(props: FancyHoverCardProps) {
    const size: 'sm'|'lg' = props.size || 'lg'
    const titleSize = size == 'lg' ? 26 : 22

    return (
        <Card
            isPressable

            variant="bordered"
            className={`${styles["fancy-card"]} ${styles[size]}`}
            css={{ $$cardColor: '$colors$primaryLight', height: '100%' }}
            >
                <Card.Body className={styles["fancy-card-content"]}>
                    <Text
                        h3
                        className={styles["title"]}
                        css={{
                            color: "$colors$primary",
                            marginBottom: 0
                        }}
                        size={titleSize}
                    >
                        {props.title}
                    </Text>
                    <Text
                        className={styles["description"]}
                        css={{
                            color: "$colors$primaryLightActive",
                        }}
                    >
                        {props.description}
                    </Text>
                    <Text
                        h3
                        className={styles['action-phrase']}
                        size={titleSize}
                    >
                        {props.hover}
                    </Text>
                    
                </Card.Body>
        </Card>
    )
}