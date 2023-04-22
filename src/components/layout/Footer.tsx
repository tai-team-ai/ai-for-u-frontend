import React from 'react'
import NextLink from 'next/link'
import { Container, Grid, Text, Image, Link } from '@nextui-org/react'
import { routes } from '@/utils/constants'
import styles from '@/styles/Footer.module.css'
import SubscribeField from '../elements/SubscribeField'
import GoProModal from '@/components/modals/GoProModal'

const Footer = (): JSX.Element => {
  const [showGoProModal, setShowGoProModal] = React.useState(false)
  return <footer className={styles.footer}>
    <Container>
        <Grid.Container>
            <Grid xs={0} sm={6} justify='center'>
                <ul style={{ listStyle: 'none' }}>
                    <Text h3 css={{ lineHeight: '1em', marginTop: '1em' }}>Pages</Text>
                    <li>
                        <NextLink href={routes.SANDBOX} style={{ color: 'var(--primary)' }}>Sandbox</NextLink>
                    </li>
                    <li>
                        <NextLink href={routes.TEMPLATES} style={{ color: 'var(--primary)' }}>Templates</NextLink>
                    </li>
                    <li><Link color='error' onClick={() => { setShowGoProModal(true) }}>GoPro</Link></li>
                </ul>
            </Grid>
            <Grid xs={12} sm={6} justify='center'>
                <Grid.Container>
                    <Grid xs={12} justify='center'>
                        <NextLink href={routes.ROOT}>
                            <Image
                                src="/logo-full-aligned-right.png"
                                width={180}
                                css={{ marginBottom: '1.5em' }}
                            />
                        </NextLink>
                    </Grid>
                    <Grid xs={12} justify='center'>
                        <SubscribeField/>
                    </Grid>
                </Grid.Container>
            </Grid>
        </Grid.Container>
        <Text css={{ textAlign: 'center' }}>&copy; AIforU - 2022</Text>
    </Container>
    <GoProModal open={showGoProModal} setOpenState={setShowGoProModal} />
  </footer>
}

export default Footer
