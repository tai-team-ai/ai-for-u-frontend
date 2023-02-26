import PageNavbar from '@/components/layout/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import { Container } from '@nextui-org/react'
import { SSRProvider } from 'react-bootstrap';
import { useSession } from 'next-auth/react';


interface LayoutProps {
    children: any;
}

function Layout({children}: LayoutProps) {
    return (
        <SSRProvider>
            <PageNavbar/>
            <Container>
                {children}
            </Container>
            <div>
                <Footer/>
            </div>
        </SSRProvider>
    )
}
export default Layout;