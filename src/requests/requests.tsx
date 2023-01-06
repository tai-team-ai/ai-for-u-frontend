// Create functions that make requests to the backend. The exact api
// definition will be provided in the backend documentation.
// include error handling



export const makeRequest = async function (payload: string) {

    const apiAddress = "https://fiqqq7p01k.execute-api.us-west-2.amazonaws.com/prod/completions";

    const init: RequestInit = {
        method: 'POST',
        body: payload,
    };

    const response = await fetch(apiAddress, init);
    const data = await response.json();
    // log the data
    console.log(data);
    return data;
}
