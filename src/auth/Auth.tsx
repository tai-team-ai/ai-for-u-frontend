import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Auth = () => {
    return (
        <React.Fragment>
            <Header />
            <Outlet />
        </React.Fragment>
    );
}
export default Auth;