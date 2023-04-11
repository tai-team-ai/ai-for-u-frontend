import React from "react";
import { Container, Grid, Text, useTheme, Image } from "@nextui-org/react";
import { routes } from "@/utils/constants";
import Link from "next/link";
import styles from "@/styles/Footer.module.css";
import SubscribeField from "../elements/SubscribeField";



const Footer = () => {
    const { theme } = useTheme();

    return (
        <React.Fragment>
            <footer className={styles["footer"]} style={{
                borderTop: `solid 1px`,
                borderTopColor: theme?.colors.primaryBorder.value
            }}>
                <Container>
                    <Grid.Container>
                        <Grid xs={12} sm={12} md={6} lg={4}>
                            <ul>
                                <Text h3>Pages</Text>
                                <li><Link href={routes.SANDBOX}>Sandbox</Link></li>
                                <li><Link href={routes.TEMPLATES}>Templates</Link></li>
                            </ul>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={4} css={{ textAlign: "center" }}>
                            <SubscribeField />
                        </Grid>
                        <Grid>
                            <Image
                                src="/logo-full.png"
                                width={100}
                            />
                        </Grid>
                    </Grid.Container>
                    <Text css={{ textAlign: "center" }}>
                        &copy; AIforU - 2022
                    </Text>
                </Container>
            </footer>
        </React.Fragment>
    );
}
export default Footer;