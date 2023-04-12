import React from 'react'
import { CssBaseline } from '@nextui-org/react'
import Navbar from '../../components/layout/navigation/Navbar'

export default function HeroPage (): JSX.Element {
  return (
        <html lang="en">
            <head>{CssBaseline.flush()}</head>
            <body>
                {/** todo: this should actually read from the session data */}
                <Navbar />
            </body>
        </html>
  )
}
