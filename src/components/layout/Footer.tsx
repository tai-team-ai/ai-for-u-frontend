import React from "react";
import { Container } from "@nextui-org/react";
const Footer = () => {
    return (
        <React.Fragment>
            <footer className="bg-light border-top py-3 fixed-bottom relative">
                <Container css={{textAlign: "center"}}>
                    &copy; AIforU - 2022
                </Container>
            </footer>
        </React.Fragment>
    );
}
export default Footer;