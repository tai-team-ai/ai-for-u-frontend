import React from "react";
import Navbar from "@/components/layout/navigation/Navbar";


const Auth = (props: any) => {
    return (
        <React.Fragment>
            <Navbar/>
            {props.children}
        </React.Fragment>
    );
}
export default Auth;