import React from 'react'
import { Container, Grid, Text, Image, Link } from '@nextui-org/react'
import { routes } from '@/utils/constants'
import styles from '@/styles/Footer.module.css'
import SubscribeField from '../elements/SubscribeField'

const Footer = (): JSX.Element => {
  return (
        <React.Fragment>
            <footer className={styles.footer}>
                <Container fluid css={{ borderTop: 'solid 1px $colors$primary' }}>
                    <Container>
                        <Grid.Container>
                            <Grid xs={12} sm={12} md={6} lg={4}>
                                <ul>
                                    <Text h3>Pages</Text>
                                    <li><Link css={{ color: '$colors$primary' }} href={routes.SANDBOX}>Sandbox</Link></li>
                                    <li><Link css={{ color: '$colors$primary' }} href={routes.TEMPLATES}>Templates</Link></li>
                                </ul>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={4} css={{ textAlign: 'center', paddingTop: '1em' }}>
                                <SubscribeField />
                            </Grid>
                            <Grid>
                                <Image
                                    src="/logo-full.png"
                                    width={100}
                                />
                            </Grid>
                        </Grid.Container>
                        <Text css={{ textAlign: 'center' }}>
                            &copy; AIforU - 2022
                        </Text>
                    </Container>
                </Container>
            </footer>
        </React.Fragment>
  )
}
export default Footer
