import React from 'react'
import { CssBaseline } from '@nextui-org/react';
import { routes } from '../../utils/constants';
import Navbar from '../../components/layout/navigation/Navbar'

export default function HeroPage() {
    return (
        <html lang="en">
            <head>{CssBaseline.flush()}</head>
            <body> 
                {/** todo: this should actually read from the session data */}
                <Navbar isLoggedIn={false} />
            </body>
        </html>
    )
}