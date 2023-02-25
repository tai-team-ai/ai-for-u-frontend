import PageNavbar from '@/components/layout/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import { Container, Spacer } from '@nextui-org/react'
import { SSRProvider } from 'react-bootstrap';


interface LayoutProps {
    children: any;
}

function Layout(props: LayoutProps) {
    return (
        <SSRProvider>
            <PageNavbar isLoggedIn={false}/>
            <Spacer y={1} />
            <Container>
                {props.children}
            </Container>
            <Footer/>
        </SSRProvider>
    )
}
export default Layout;