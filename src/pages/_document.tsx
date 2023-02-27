import { CssBaseline, NextUIProvider, createTheme } from '@nextui-org/react'
import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
    const theme = createTheme({
        type: "light", // it could be "light" or "dark"
        theme: {
          colors: {
            // brand colors
            primaryLight: '$green200',
            primaryLightHover: '$green300',
            primaryLightActive: '$green400',
            primaryLightContrast: '$green600',
            primary: '#382466',
            primaryBorder: '$green500',
            primaryBorderHover: '$green600',
            primarySolidHover: '$green700',
            primarySolidContrast: '$white',
            primaryShadow: '$green500',
      
            gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
            link: '#5E1DAD',
      
            myPurple: '#382466',
          },
          space: {},
          fonts: {}
        }
      })
    return (
        <NextUIProvider theme={theme}>
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
