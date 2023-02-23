
import React, { useEffect, useState } from "react";
import { constants } from "@/utils/constants";
import axios from "axios";
import Layout from '@/components/layout/layout'
import styles from '@/styles/Home.module.css';
import Image from "next/image";

interface TrustBuilderProps {
    companyName: string;
    logo: string;
}

function TrustBuilder(props: TrustBuilderProps) {
    return (
        <div className={styles["trust-builder-card"]}>
            <Image src={props.logo} alt={props.companyName}/>
        </div>
    )
}

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
                <div className={styles["hero-content"]}>
                    <h1 className={styles["hero-heading"]}>
                        CTA
                    </h1>
                    <p className={styles["hero-paragraph"]}>
                        Eu dolor nulla officia officia nostrud nostrud consectetur adipisicing. Qui adipisicing consectetur sit ea amet. Aute excepteur pariatur duis culpa sint ipsum ad eu non consequat veniam qui. Tempor commodo incididunt irure dolore eu officia commodo consequat aliquip.
                    </p>
                    <div className={styles["templates-btn"]}>
                        Templates
                    </div>
                    <div className={styles["sandbox-btn"]}>
                        Sandbox
                    </div>
                </div>
                <div className={styles["hero-graphic"]}>
                    <Image src="" alt="" className={styles["hero-image"]}/>
                </div>
            </section>
            <section className={styles["trust-builders"]}>
                <TrustBuilder logo="" companyName="" />
                <TrustBuilder logo="" companyName="" />
                <TrustBuilder logo="" companyName="" />
                <TrustBuilder logo="" companyName="" />
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