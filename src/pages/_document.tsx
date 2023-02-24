import { CssBaseline, NextUIProvider } from '@nextui-org/react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <NextUIProvider>
            <Html>
                <Head>{CssBaseline.flush()}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        </NextUIProvider>
    )
}
