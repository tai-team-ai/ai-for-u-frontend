
import React, { useEffect, useState } from "react";
import { constants, routes } from "@/utils/constants";
import axios from "axios";
import Layout from '@/components/layout/layout'
import AIForAnimation from '@/components/elements/AIForAnimation'
import styles from '@/styles/Home.module.css';
import Image from "next/image";
import { Card, Col, Container, Row, Spacer, Text, Button, Link, Grid } from "@nextui-org/react";

interface TrustBuilderProps {
    companyName: string
    src: string
    size: number
}

function TrustBuilder(props: TrustBuilderProps) {
    return (
        <Card className={styles["trust-builder-card"]}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffff">
                    Trust Builder
                </Text>
                <Text h4 color="white">
                    {props.companyName}
                </Text>
            </Col>
            </Card.Header>
            <Card.Image
                className={styles["trust-builder-image"]}
                src={props.src}
                objectFit="cover"
                width="100%"
                height={300}
                alt={props.companyName}
            />
        </Card>
    )
}

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
                        <div className={styles["hero-graphic"]}>
                            <AIForAnimation />
                        </div>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Container>
                            <Row justify="center">
                                <Text h1 className={styles["hero-heading"]}>
                                    CTA
                                </Text>
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
                        <TrustBuilder src="/images/trust-builder/1.jpg" size={300} companyName="AIForU" />
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <TrustBuilder src="/images/trust-builder/2.jpg" size={300} companyName="Macrosoft" />
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <TrustBuilder src="/images/trust-builder/3.jpg" size={300} companyName="Goggle" />
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <TrustBuilder src="/images/trust-builder/4.jpg" size={300} companyName="Whalemart" />
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