import { Session } from "next-auth";
import { getUserID } from "./user";


interface uFetchProps extends RequestInit {
    session?: Session|null;
}

// A wrapper around fetch to set userId in the headers by default
export async function uFetch(input: RequestInfo | URL, {session=null, ...init}: uFetchProps): Promise<Response> {
    let userId = getUserID(session);
    let defaultHeaders: { "content-type": string, "user-id"?: string} = {"content-type": "application/json"};
    if(typeof userId !== "undefined") {
        defaultHeaders["user-id"] = userId;
    }

    return fetch(input, {
        headers: {
            ...defaultHeaders,
            ...init.headers,
        }, ...init});
}