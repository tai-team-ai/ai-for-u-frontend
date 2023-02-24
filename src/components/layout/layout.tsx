import PageNavbar from '@/components/layout/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import { Container } from '@nextui-org/react'
import { SSRProvider } from 'react-bootstrap';


interface LayoutProps {
    children: any;
}

function Layout(props: LayoutProps) {
    return (
        <SSRProvider>
            <PageNavbar isLoggedIn={false}/>
            <Container>
                {props.children}
            </Container>
            <div>
                <Footer/>
            </div>
        </SSRProvider>
    )
}
export default Layout;