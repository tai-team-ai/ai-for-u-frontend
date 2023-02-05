import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";


const Auth = (props: any) => {
    return (
        <React.Fragment>
            <AuthNavbar />
            {props.children}
        </React.Fragment>
    );
}
export default Auth;