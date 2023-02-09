/*
This module defines the LandingPage page. This page is page that the users are directed to when they first log in.
This page contains the Header and PromptPanel components. The Header component is used to display the navigation bar.
The PromptPanel component is used to display the forms that are available to the user.
*/

import React from "react";
import { Container } from "react-bootstrap";
import PromptPanel from "../components/layout/PromptPanel";

export default function LandingPage() {
    return (
        <React.Fragment>
            <Container className='py-5'>
                <PromptPanel />
            </Container>
        </React.Fragment>
    )
}