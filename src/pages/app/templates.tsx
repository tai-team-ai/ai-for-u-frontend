import React, { useState } from 'react'
import Layout from '@/components/layout/layout'
import styles from '@/styles/Templates.module.css'
import {Grid} from '@nextui-org/react'
import SubscribeModal from '@/components/modals/SubscribeModal'
import TemplateCard, { TemplateCards } from '@/components/elements/TemplateCard'

interface TemplatesProps {

}

function Templates({}: TemplatesProps) {
    const [showSubscribeModal, setShowSubscribeModal] = useState<boolean>(false);

    return (
        <Layout>
            <section className={styles["templates-section"]}>
                <Grid.Container gap={2} justify='center'>
                    {
                        TemplateCards.map((c) => {
                            return (
                                <Grid md={3} sm={4} xs={6}>
                                    {c}
                                </Grid>
                            )
                        })
                    }
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