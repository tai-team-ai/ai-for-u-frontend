import PageNavbar from '@/components/layout/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import { Container, Spacer } from '@nextui-org/react'
import { SSRProvider } from 'react-bootstrap';
import { useSession } from 'next-auth/react';


interface LayoutProps {
    children: any;
}

function Layout({children}: LayoutProps) {
    return (
        <SSRProvider>
            <PageNavbar/>
            <Spacer y={1} />
            <Container>
                {children}
            </Container>
            <Footer/>
        </SSRProvider>
    )
}
export default Layout;