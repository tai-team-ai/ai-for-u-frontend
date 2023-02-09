import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/layout/navigation/AuthNavbar";


const Auth = (props: any) => {
    return (
        <React.Fragment>
            <AuthNavbar />
            {props.children}
        </React.Fragment>
    );
}
export default Auth;