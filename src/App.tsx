
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { constants } from "./util/constants";
import Footer from "./components/Footer";
import PageNavBar from "./components/Navbar";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem(constants.LOCAL_TOKEN_KEY_NAME);
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {isLoggedIn && <PageNavBar />}
            <Outlet />
			<Footer />
        </React.Fragment>
    );
}
export default App;