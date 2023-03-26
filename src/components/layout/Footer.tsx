import React, { useRef, useState } from "react";
import { Button, Container, Grid, Input, Text, useTheme, Loading, Image } from "@nextui-org/react";
import { routes } from "@/utils/constants";
import Link from "next/link";
import styles from "@/styles/Footer.module.css";
import { useSession } from "next-auth/react";
import { joinMailingList } from "@/utils/endpoints";



const Footer = () => {
    const { theme } = useTheme();
    const userEmail = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { data: session } = useSession();


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
                            {!isSubscribed ?
                                <form id="subscribeForm" onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!userEmail.current) {
                                        return;
                                    }
                                    const email = userEmail.current.value;
                                    joinMailingList({ session, email, setIsSubmitting, setIsSubscribed });
                                }}>
                                    <Input
                                        id="mailing-email-input"
                                        placeholder="Join our mailing list!"
                                        type="email"
                                        ref={userEmail}
                                        contentRight={
                                            <Button
                                                type="submit"
                                                auto
                                                flat
                                            >
                                                {!isSubmitting ? "Subscribe" : <Loading type="points"></Loading>}
                                            </Button>
                                        } />
                                </form> : <>
                                    <Text>Thank you for subscribbing to our mailing list</Text>
                                </>}
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