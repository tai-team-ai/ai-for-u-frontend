
import React, { useEffect, useState } from "react";
import { constants } from "@/utils/constants";
import Footer from "@/components/layout/Footer";
import PageNavBar from "@/components/layout/navigation/Navbar";
import axios from "axios";
import Layout from '@/components/layout/layout'

function App() {
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
        </Layout>
    );
}
export default App;