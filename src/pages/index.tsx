
import React from 'react'
import { routes } from '@/utils/constants'
import Layout from '@/components/layout/layout'
import AIForAnimation from '@/components/elements/AIForAnimation'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { Container, Row, Spacer, Button, Link, Grid } from '@nextui-org/react'
import FancyHoverCard from '@/components/elements/FancyHoverCard'
import { isMobile } from '@/utils/hooks'

const HERO_DESCRIPTION: string = 'Super charge your life with powerful AI tools!'

function Home (): JSX.Element {
  const isMobileDisplay: boolean = isMobile()
  return (
        <Layout>
            <section className={styles['hero-section']}>
                <Grid.Container gap={1} direction="row-reverse">
                    {!isMobileDisplay
                      ? (
                        <Grid xs={12} sm={6}>
                            <img src="/images/screen.svg" ></img>
                        </Grid>
                        )
                      : (
                          <></>
                        )}
                    <Grid xs={12} sm={6}>
                        <Container style={{ display: 'flex' }}>
                            <Row justify="center" css={{ marginTop: '10%' }}>
                                <AIForAnimation />
                            </Row>
                            <Row justify="center">
                                <p className={styles['hero-paragraph']}>
                                    {HERO_DESCRIPTION}
                                </p>
                            </Row>
                            <Row justify="center">
                                <Link href={routes.TEMPLATES}>
                                    <Button
                                        flat
                                        size="lg"
                                        className={styles['templates-btn']}>
                                        Templates
                                    </Button>
                                </Link>
                            </Row>
                            <Spacer y={0.5} />
                            <Row justify="center">
                                <Link href={routes.SANDBOX}>
                                    <Button
                                        flat
                                        size="lg"
                                        className={styles['sandbox-btn']}>
                                        Sandbox
                                    </Button>
                                </Link>
                            </Row>
                            <Spacer y={5} />
                        </Container>
                    </Grid>
                </Grid.Container>
            </section>
            <section className={styles['trust-builders']}>
                <Grid.Container gap={1}>
                    <Grid xs={6} sm={3}>
                        <FancyHoverCard
                            size="sm"
                            title={'AIForU'}
                            description={'See what this innovative company is doing!'}
                            hover="AI for Everyone!"
                        />
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <FancyHoverCard
                            size="sm"
                            title={'Macrosoft'}
                            description={'Big products, big solutions!'}
                            hover="AI for Everyone!"
                        />
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <FancyHoverCard
                            size="sm"
                            title={'Goggle'}
                            description={'Even AI needs protection from those UV rays!'}
                            hover="AI for Everyone!"
                        />
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <FancyHoverCard
                            size="sm"
                            title={'Whalemart'}
                            description={'Where else can whales go for their krill?'}
                            hover="AI for Everyone!"
                        />
                    </Grid>
                </Grid.Container>
            </section>
            <section className={styles['pages-section']}>
                <div className={styles['pages-content']}>
                    <h1 className={styles['pages-title']}>
                        Pages
                    </h1>
                    <p className={styles['pages-paragraph']}>
                        Cupidatat deserunt deserunt aute ullamco ea commodo deserunt et. Deserunt culpa pariatur dolore ad culpa ea eiusmod in ut. Qui in est est occaecat minim veniam ipsum culpa irure occaecat. Nulla duis quis eiusmod eu pariatur mollit pariatur mollit.
                    </p>
                </div>
                <div className={styles['pages-graphic']}>
                    <Image src="" alt=""/>
                </div>
            </section>
        </Layout>
  )
}
export default Home
