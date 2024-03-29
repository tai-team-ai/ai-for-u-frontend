import React from 'react'
import styles from '@/styles/FancyHoverCard.module.css'
import { Card, Text } from '@nextui-org/react'

interface FancyHoverCardProps {
  size?: 'sm' | 'lg'
  title: string
  description: string
  hover: string
}

export default function FancyHoverCard (props: FancyHoverCardProps): JSX.Element {
  const size: 'sm' | 'lg' = props.size ?? 'lg'
  const titleSize = size === 'lg' ? 30 : 22
  const descriptionSize = size === 'lg' ? 20 : 16

  return (
        <Card
            isPressable
            variant='bordered'
            className={`${styles['fancy-card']} ${styles[size]}`}
            css={{ $$cardColor: '$colors$primaryLight', height: '100%', paddingBottom: '1rem', boxSizing: 'border-box', boxShadow: '1px 1px 3px 0 rgba(0, 0, 0, 0.1), -1px -1px 3px 0 rgba(0, 0, 0, 0.1)' }}
            >
                <Card.Body className={styles['fancy-card-content']}>
                    <Text
                        h3
                        className={styles.title}
                        css={{
                          color: '$colors$primaryLightContrast',
                          marginBottom: '0.5rem',
                          textAlign: 'center',
                          lineHeight: '2.3rem'
                        }}
                        size={titleSize}
                    >
                        {props.title}
                    </Text>
                    <Text
                        className={styles.description}
                        css={{
                          // color: '$colors$primaryLightContrast',
                          lineHeight: '1.9rem',
                          padding: '0 0.2rem',
                          textAlign: 'center'
                        }}
                        weight='light'
                        size={descriptionSize}
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
