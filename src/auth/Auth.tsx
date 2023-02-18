import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/navigation/Navbar";


const Auth = (props: any) => {
    return (
        <React.Fragment>
            <Navbar isLoggedIn={false} />
            {props.children}
        </React.Fragment>
    );
}
export default Auth;