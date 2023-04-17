
import React, { useState } from 'react'
import { routes } from '@/utils/constants'
import Layout from '@/components/layout/layout'
import AIForAnimation from '@/components/elements/AIForAnimation'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { Container, Row, Spacer, Button, Link, Grid } from '@nextui-org/react'
import FancyHoverCard from '@/components/elements/FancyHoverCard'
import SubscribeModal from '@/components/modals/SubscribeModal'
import { isMobile } from '@/utils/hooks'

const HERO_DESCRIPTION: string = 'Super charge your life with powerful AI templates & tools! 🚀'

const TRUST_BUILDERS = [
  {
    title: 'AI Assistant (ChatGPT)',
    description: 'Identical to ChatGPT, without the wait! You will be blown away by the functionality that this tool offers! From generating content ideas, to writing emails, to just chatting, we\'ve got you covered!',
    hover: 'Let\'s Chat! 😊',
    link: routes.SANDBOX,
    subscribeModal: false
  },
  {
    title: 'Chrome Gmail Extension',
    description: 'Tired of writing emails? Let AI do it for you! Our Chrome extension fully automates the process of writing emails! We\'re really excited to bring this to you!',
    hover: 'Coming Soon! 🙌',
    link: null,
    subscribeModal: true
  },
  {
    title: 'Baby Name Generator',
    description: 'We\'ve heard you, and we\'re working on it! Our AI will help you find the perfect name while your expecting or dreaming of that perfect name!',
    hover: 'Almost there! 🎊',
    link: null,
    subscribeModal: true
  },
  {
    title: 'Mobile AI Tools Application',
    description: 'We\'re working on bringing our AI tools to your mobile devices! We will be offering powerful multi-modal AI tools for your mobile devices!',
    hover: 'Heck yeah! 🤩',
    link: null,
    subscribeModal: true
  }
]

function Home (): JSX.Element {
  const isMobileDisplay: boolean = isMobile()
  const [open, setOpen] = useState(false)
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
                    <Link
                          href={TRUST_BUILDERS.link != null ? TRUST_BUILDERS.link : '#'}
                          style={{ height: '100%', width: '100%' }}
                          onClick={(e) => {
                            if (TRUST_BUILDERS.subscribeModal) {
                              e.preventDefault()
                              setOpen(true)
                            }
                          }}
                      >
                      <FancyHoverCard
                        size="lg"
                        title={TRUST_BUILDERS.title}
                        description={TRUST_BUILDERS.description}
                        hover={TRUST_BUILDERS.hover}
                      />
                    </Link>
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
            <SubscribeModal open={open} setOpen={setOpen} />
        </Layout>
  )
}
export default Home
