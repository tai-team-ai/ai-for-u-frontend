import React, { useRef, useState } from 'react'
import Layout from '@/components/layout/layout'
import Link from 'next/link'
import styles from '@/styles/Templates.module.css'
import {Input, Modal, Button, Card, Container, Row, Col, Grid, Text, Loading} from '@nextui-org/react'
import SubscribeModal from '@/components/modals/SubscribeModal'


interface TemplateCardProps {
    name: string
    href?: string
    onPress?: () => void
}


function TemplateCard({name, href = "#", onPress = () => {}}: TemplateCardProps) {
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

interface TemplatesProps {

}

function Templates({}: TemplatesProps) {
    const [showSubscribeModal, setShowSubscribeModal] = useState<boolean>(false);

    return (
        <Layout>
            <section className={styles["templates-section"]}>
                <Grid.Container gap={2} justify='center'>
                    <Grid md={3} sm={4} xs={6}>
                        <TemplateCard
                            href="/templates/resignation-letter"
                            name="Resignation Letter"
                        />
                    </Grid>
                    <Grid md={3} sm={4} xs={6}>
                        <TemplateCard
                            name="Coming Soon..."
                            onPress={() => setShowSubscribeModal(true)}
                        />
                    </Grid>
                </Grid.Container>
            </section>
            <SubscribeModal open={showSubscribeModal} setOpen={setShowSubscribeModal} />
        </Layout>
    )
}

export default Templates;