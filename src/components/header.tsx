import { Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">AI Writer</Navbar.Brand>
            </Container>
        </Navbar>
    );
}