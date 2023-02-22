import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { constants, routes } from "./constants";


const ProtectedRoute = (props: any) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem(constants.LOCAL_TOKEN_KEY_NAME);
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate(routes.LOGIN);
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
            checkUserToken();
        }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;