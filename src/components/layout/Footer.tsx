import React from 'react'
import { Container, Grid, Text, Image, Link, useModal } from '@nextui-org/react'
import { routes } from '@/utils/constants'
import styles from '@/styles/Footer.module.css'
import SubscribeField from '../elements/SubscribeField'
import GoProModal from '@/components/modals/GoProModal'


const Footer = (): JSX.Element => {
  const { setVisible: setShowGoProModal, bindings: goProBindings } = useModal()
  return (
        <React.Fragment>
            <footer className={styles.footer}>
                <Container fluid css={{ borderTop: 'solid 1px $colors$primary', marginTop: '2em' }}>
                  <Container>
                    <Grid.Container gap={2} justify='space-between'>
                      <Grid justify='flex-start' css={{ marginLeft: '3em' }}>
                        <ul>
                          <Text h3 css={{ lineHeight: '2em' }}>Pages</Text>
                          <li><Link css={{ color: '$colors$primary' }} href={routes.SANDBOX}>Sandbox</Link></li>
                          <li><Link css={{ color: '$colors$primary' }} href={routes.TEMPLATES}>Templates</Link></li>
                          <li><Link css={{ color: '$colors$primary' }} onClick={() => { setShowGoProModal(true) }}>GoPro</Link></li>
                        </ul>
                      </Grid>
                      <Grid justify='flex-end' css={{ marginRight: '-3em', marginTop: '1em' }}>
                        <Image
                          src="/logo-full-aligned-right.png"
                          width={180}
                          css={{ marginBottom: '1.5em' }}
                        />
                        <SubscribeField style={{ marginRight: '11em' }} />
                      </Grid>
                    </Grid.Container>
                    <Text css={{ textAlign: 'center' }}>
                      &copy; AIforU - 2022
                    </Text>
                  </Container>
                </Container>
            </footer>
            <GoProModal bindings={goProBindings} />
        </React.Fragment>
  )
}
export default Footer
