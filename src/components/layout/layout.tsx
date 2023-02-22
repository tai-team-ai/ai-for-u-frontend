import PageNavbar from '@/components/layout/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import { SSRProvider } from 'react-bootstrap';


interface LayoutProps {
    children: any;
}

function Layout(props: LayoutProps) {
    return (
        <SSRProvider>
        <PageNavbar isLoggedIn={false}/>
        <div>
            <Footer/>
        </div>
        </SSRProvider>
    )
}
export default Layout;