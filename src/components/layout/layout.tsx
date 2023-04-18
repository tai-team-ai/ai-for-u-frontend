import PageNavbar from '@/components/layout/navigation/Navbar'
import Footer from '@/components/layout/Footer'
import { Container, NextUIProvider, createTheme } from '@nextui-org/react'
import { SSRProvider } from 'react-bootstrap'
import Snackbar from '../elements/Snackbar'

interface LayoutProps {
  children: any
}

interface ColorsType {
  [key: string]: string
  primaryLight: string
  primaryLightHover: string
  primaryLightActive: string
  primaryLightContrast: string
  primaryBorder: string
  primaryBorderHover: string
  primarySolidHover: string
  primarySolidContrast: string
  primaryShadow: string
  secondaryLight: string
  secondaryLightContrast: string
}

// Also defined in global.css for now (defined there to prevent FOUC). Iddeally the styles in there would populate the below.
export const colors: ColorsType = {
  primaryLight: '#CAB1EF', // originally $blue200
  primaryLightHover: '#9D7FD1', // originally $blue300
  primaryLightActive: '#6E54A3', // originally $blue400
  primaryLightContrast: '#2B1A57', // originally $blue600
  primaryBorder: '#382466', // originally $blue500
  primaryBorderHover: '#2B1A57', // originally $blue600
  primarySolidHover: '#1F1249', // originally $blue700
  primarySolidContrast: '$white', // originally $white
  primaryShadow: '#382466', // originally $blue500
  secondaryLight: '#EADCF8',
  secondaryLightContrast: '#7828C8'
}

export const theme = createTheme({
  type: 'light', // it could be "light" or "dark"
  theme: {
    // generated using https://colors.eva.design/
    colors,
    space: {},
    fonts: {}
  }
})

function Layout ({ children }: LayoutProps): JSX.Element {
  return (
    <SSRProvider>
      <NextUIProvider theme={theme}>
          <PageNavbar />
          <Container css={{
            '@media screen and (min-width: 1280px)': {
              maxWidth: '1430px'
            },
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '7rem', // This will create space at the bottom of the container for the footer.
            minHeight: '90vh' // This will make the container grow with its contents.
          }}>
            {children}
          </Container>
          <Footer />
        <Snackbar />
      </NextUIProvider>
    </SSRProvider>
  )
}
export default Layout
