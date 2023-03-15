import styles from '@/styles/Template.module.css'
import {routes} from '@/utils/constants'
import { Grid, Text } from '@nextui-org/react'
import Link from 'next/link'
import { TemplateCards } from '../elements/TemplateCard'


interface TemplateProps {
    isSandbox?: boolean
    children?: React.ReactNode
}


export default function Template({isSandbox = false, children = null}: TemplateProps) {
    return (
        <Grid.Container gap={1} direction="row-reverse">
            <Grid sm={9} xs={12}>
                <section className={styles["content"]}>
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
                            TemplateCards.map((c, i) => {
                                return (
                                    <Grid key={i} xs={12}>
                                        {c}
                                    </Grid>
                                )
                            })
                        }
                        </Grid.Container>
                    </div>
                </section>
            </Grid>

            
        </Grid.Container>
        
    )
}