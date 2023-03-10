import PageNavbar from '@/components/layout/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import { Container, Spacer, NextUIProvider, createTheme } from '@nextui-org/react'
import { SSRProvider } from 'react-bootstrap';
import { useSession } from 'next-auth/react';


interface LayoutProps {
    children: any;
}

function Layout({children}: LayoutProps) {
    const theme = createTheme({
        type: "light", // it could be "light" or "dark"
        theme: {
            // generated using https://colors.eva.design/
            colors: {
                primaryLight: '#CAB1EF', // originally $blue200
                primaryLightHover: '#9D7FD1',  // originally $blue300
                primaryLightActive: '#6E54A3', // originally $blue400
                primaryLightContrast: '#2B1A57', // originally $blue600
                primary: '#2B1A57', // originally $blue600
                primaryBorder: '#382466', // originally $blue500
                primaryBorderHover: '#2B1A57', // originally $blue600
                primarySolidHover: '#1F1249', // originally $blue700
                primarySolidContrast: '$white', // originally $white
                primaryShadow: '#382466' // originally $blue500
            },
            space: {},
            fonts: {}
        }
    })
    return (
        <SSRProvider>
            <NextUIProvider theme={theme}>
                <PageNavbar/>
                <Spacer y={1} />
                <Container>
                    {children}
                </Container>
                <Footer/>
            </NextUIProvider>
        </SSRProvider>
    )
}
export default Layout;