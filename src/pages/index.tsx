
import React, { useEffect, useState } from "react";
import { constants, routes } from "@/utils/constants";
import axios from "axios";
import Layout from '@/components/layout/layout'
import AIForAnimation from '@/components/elements/AIForAnimation'
import styles from '@/styles/Home.module.css';
import Image from "next/image";
import { Container, Row, Spacer, Text, Button, Link, Grid } from "@nextui-org/react";
import FancyHoverCard from "@/components/elements/FancyHoverCard";


function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const navigate = useNavigate();

    const checkUserToken = () => {
        const userToken = localStorage.getItem(constants.LOCAL_TOKEN_KEY_NAME);
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
        axios.defaults.headers.common[constants.LOCAL_TOKEN_KEY_NAME] = userToken
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <Layout>
            <section className={styles["hero-section"]}>
                <Grid.Container gap={1} direction="row-reverse">
                    <Grid xs={12} sm={6}>
                        <img src="/images/screen.svg" ></img>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Container>
                            <Row justify="center">
                                <AIForAnimation />
                            </Row>
                            <Row justify="center">
                                <p className={styles["hero-paragraph"]}>
                                    Eu dolor nulla officia officia nostrud nostrud consectetur adipisicing. Qui adipisicing consectetur sit ea amet. Aute excepteur pariatur duis culpa sint ipsum ad eu non consequat veniam qui. Tempor commodo incididunt irure dolore eu officia commodo consequat aliquip.
                                </p>
                            </Row>
                            <Spacer y={0.5} />
                            <Row justify="center">
                                <Link href={routes.TEMPLATES}>
                                    <Button
                                        flat
                                        size="lg"
                                        className={styles["templates-btn"]}>
                                        Templates
                                    </Button>
                                </Link>
                            </Row>
                            <Spacer y={0.5} />
                            <Row justify="center">
                                <Link href={routes.SANDBOX}>
                                    <Button
                                        flat
                                        size="lg"
                                        className={styles["sandbox-btn"]}>
                                        Sandbox
                                    </Button>
                                </Link>
                            </Row>
                            <Spacer y={0.5} />
                        </Container>
                    </Grid>
                </Grid.Container>
            </section>
            <section className={styles["trust-builders"]}>
                <Grid.Container gap={1}>
                    <Grid xs={6} sm={3}>
                        <FancyHoverCard
                            size="sm"
                            title={"AIForU"}
                            description={"See what this innovative company is doing!"}
                            hover="AI for Everyone!"
                        />
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <FancyHoverCard
                            size="sm"
                            title={"Macrosoft"}
                            description={"Big products, big solutions!"}
                            hover="AI for Everyone!"
                        />
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <FancyHoverCard
                            size="sm"
                            title={"Goggle"}
                            description={"Even AI needs protection from those UV rays!"}
                            hover="AI for Everyone!"
                        />
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <FancyHoverCard
                            size="sm"
                            title={"Whalemart"}
                            description={"Where else can whales go for their krill?"}
                            hover="AI for Everyone!"
                        />
                    </Grid>
                </Grid.Container>
            </section>
            <section className={styles["pages-section"]}>
                <div className={styles["pages-content"]}>
                    <h1 className={styles["pages-title"]}>
                        Pages
                    </h1>
                    <p className={styles["pages-paragraph"]}>
                        Cupidatat deserunt deserunt aute ullamco ea commodo deserunt et. Deserunt culpa pariatur dolore ad culpa ea eiusmod in ut. Qui in est est occaecat minim veniam ipsum culpa irure occaecat. Nulla duis quis eiusmod eu pariatur mollit pariatur mollit.
                    </p>
                </div>
                <div className={styles["pages-graphic"]}>
                    <Image src="" alt=""/>
                </div>
            </section>
        </Layout>
    );
}
export default Home;