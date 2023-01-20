// Create functions that make requests to the backend. The exact api
// definition will be provided in the backend documentation.
// include error handling

import axios from "axios";




export const makeRequest = async function (payload: string) {
    // make a GET request to google.com with axios
    axios.get('https://fayka0tfb4.execute-api.us-west-2.amazonaws.com/prod/openai/status')
        .then(function (response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data["status"];
        });
    console.log("hello");
    return "hello";
}
