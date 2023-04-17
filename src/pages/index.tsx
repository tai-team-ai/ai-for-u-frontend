
import React from 'react'
import { routes } from '@/utils/constants'
import Layout from '@/components/layout/layout'
import AIForAnimation from '@/components/elements/AIForAnimation'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { Container, Row, Spacer, Button, Link, Grid } from '@nextui-org/react'
import FancyHoverCard from '@/components/elements/FancyHoverCard'
import { isMobile } from '@/utils/hooks'

const HERO_DESCRIPTION: string = 'Super charge your life with powerful AI templates & tools! 🚀'

const TRUST_BUILDERS = [
  {
    title: 'AI Assistant (ChatGPT)',
    description: 'Identical to ChatGPT, without the wait! You will be blown away by the possibilities! From generating content ideas, to writing emails, to just chatting, we\'ve got you covered!',
    hover: 'Let\'s Chat! 😊'
  },
  {
    title: 'Chrome Gmail Extension',
    description: 'Tired of writing emails? Let AI do it for you! Our Chrome extension fully automates the process of writing emails! We\'re really excited to bring this to you!',
    hover: 'Coming Soon! 🙌'
  },
  {
    title: 'Baby Name Generator',
    description: 'We\'ve heard you, and we\'re working on it! Our AI will help you find the perfect name while your expecting or dreaming of that perfect name!',
    hover: 'Almost there! 🎊'
  },
  {
    title: 'Mobile AI Tools Application',
    description: 'We\'re working on bringing our AI tools to your mobile devices! We will be offering powerful multi-modal AI tools for your mobile devices!',
    hover: 'Heck yeah! 🤩'
  }
]

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
              <Grid.Container gap={2.6}>
                {TRUST_BUILDERS.map((TRUST_BUILDERS, index) => (
                  <Grid xs={12} sm={6} md={6} key={index}>
                    <FancyHoverCard
                      size="lg"
                      title={TRUST_BUILDERS.title}
                      description={TRUST_BUILDERS.description}
                      hover={TRUST_BUILDERS.hover}
                    />
                  </Grid>
                ))}
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
