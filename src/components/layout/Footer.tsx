import React from 'react'
import { Container, Grid, Text, Image, Link } from '@nextui-org/react'
import { routes } from '@/utils/constants'
import { isMobile } from '@/utils/hooks'
import styles from '@/styles/Footer.module.css'
import SubscribeField from '../elements/SubscribeField'
import GoProModal from '@/components/modals/GoProModal'

const Footer = (): JSX.Element => {
  const isMobileDevice = isMobile()
  const [showGoProModal, setShowGoProModal] = React.useState(false)

  return (
    <>
        {isMobileDevice
          ? (
            <React.Fragment>
                <footer className={styles.footer}>
                    <Container fluid css={{ borderTop: 'solid 1px $colors$primary', marginTop: '2em' }}>
                        <Container>
                            <Grid.Container gap={2} justify='center'>
                                <Grid justify='center' css={{ marginTop: '1.3em' }}>
                                    <a href={routes.ROOT}>
                                        <Image
                                            src="/logo-full-aligned-right.png"
                                            width={180}
                                            css={{ marginBottom: '1.5em' }}
                                        />
                                    </a>
                                    <SubscribeField style={{ marginRight: '4em' }} />
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
          : (
            <React.Fragment>
                <footer className={styles.footer}>
                    <Container fluid css={{ borderTop: 'solid 1px $colors$primary', marginTop: '2em' }}>
                        <Container>
                            <Grid.Container gap={2} justify='space-between'>
                                <Grid justify='flex-start'>
                                    <ul style={{ listStyle: 'none' }}>
                                        <Text h3 css={{ lineHeight: '1em', marginTop: '1em' }}>Pages</Text>
                                        <li><Link css={{ color: '$colors$primary' }} href={routes.SANDBOX}>Sandbox</Link></li>
                                        <li><Link css={{ color: '$colors$primary' }} href={routes.TEMPLATES}>Templates</Link></li>
                                        <li><Link color='error' onClick={() => { setShowGoProModal(true) }}>GoPro</Link></li>
                                    </ul>
                                </Grid>
                                <Grid css={{ marginRight: '-5em', marginTop: '1.3em' }}>
                                    <a href={routes.ROOT}>
                                        <Image
                                            src="/logo-full-aligned-right.png"
                                            width={180}
                                            css={{ marginBottom: '1.5em' }}
                                        />
                                    </a>
                                    <SubscribeField style={{ marginRight: '11em' }} />
                                </Grid>
                            </Grid.Container>
                            <Text css={{ textAlign: 'center' }}>
                                &copy; AIforU - 2022
                            </Text>
                        </Container>
                    </Container>
                </footer>
                <GoProModal open={showGoProModal} setOpenState={setShowGoProModal} />
            </React.Fragment>
            )
      }
    </>
  )
}

export default Footer
