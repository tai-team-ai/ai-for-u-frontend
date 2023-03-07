import { Session } from "next-auth";
import { v4 as uuid } from "uuid"

// client-side function
export function getUserID(session: Session|null) {
    let id;
    if (session && typeof session.user.id !== "undefined") {
        id = session.user.id;
        // TODO: figure out whether or not this is a good approach
        // if(typeof window !== "undefined") {
        //     window.localStorage.setItem("userID", id);
        // }
    }
    else if(typeof window !== "undefined") { // not logged in
        // check localStorage
        id = window.localStorage.getItem("userID");
        if(id === null) {  // localstorage doesn't have a userID, so create one
            //first time visiting the page
            id = uuid();
            window.localStorage.setItem("userID", id);
        }
    }
    return id;
}
