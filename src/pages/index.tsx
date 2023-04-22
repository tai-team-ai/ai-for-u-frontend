
import React, { useState } from 'react'
import { routes } from '@/utils/constants'
import Layout from '@/components/layout/layout'
import AIForAnimation from '@/components/elements/AIForAnimation'
import styles from '@/styles/Home.module.css'
import { Container, Row, Spacer, Grid } from '@nextui-org/react'
import Link from 'next/link'
import FancyHoverCard from '@/components/elements/FancyHoverCard'
import SubscribeModal from '@/components/modals/SubscribeModal'
import { isMobile } from '@/utils/hooks'
import { type NextPage } from 'next'
import Router from 'next/router'

const HERO_DESCRIPTION: string = 'Super charge your life with powerful AI templates & tools! 🚀'

const TRUST_BUILDERS = [
  {
    title: 'AI Assistant (ChatGPT)',
    description: 'Identical to ChatGPT, without the wait! From generating content ideas, to writing emails, to generating code, our AI assistant is here to help!',
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

const Home: NextPage = (): JSX.Element => {
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
                                <Link href={routes.TEMPLATES} className={styles['templates-btn']}>
                                  AI Templates
                                </Link>
                            </Row>
                            <Spacer y={0.5} />
                            <Row justify="center">
                                <Link href={routes.SANDBOX} className={styles['sandbox-btn']}>
                                  AI Assistant (ChatGPT)
                                </Link>
                            </Row>
                            <Spacer y={5} />
                        </Container>
                    </Grid>
                </Grid.Container>
            </section>
            <section className={styles['trust-builders']}>
              <Grid.Container gap={2.6}>
                {TRUST_BUILDERS.map((trustBuilder, index) => (
                  <Grid xs={12} sm={6} md={3} key={index}>
                    <Link
                          className={styles['no-hover']}
                          href={trustBuilder.link != null ? trustBuilder.link : '#'}
                          style={{ height: '100%', width: '100%' }}
                          onClick={(e) => {
                            if (trustBuilder.subscribeModal) {
                              e.preventDefault()
                              setOpen(true)
                            }
                          }}
                      >
                      <FancyHoverCard
                        size="lg"
                        title={trustBuilder.title}
                        description={trustBuilder.description}
                        hover={trustBuilder.hover}
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid.Container>
            </section>
            <SubscribeModal open={open} setOpen={setOpen} />
        </Layout>
  )
}
Home.getInitialProps = async ({ res, query }): Promise<any> => {
  const callbackUrl = query.callbackUrl
  const error = query.error
  if (typeof callbackUrl !== 'undefined') {
    if (typeof res !== 'undefined' && res !== null) {
      res.writeHead(307, { Location: `${callbackUrl as string}?error=${error as string}` })
      res.end()
    } else {
      void Router.replace(callbackUrl as string)
    }
  }
  return {}
}
export default Home
