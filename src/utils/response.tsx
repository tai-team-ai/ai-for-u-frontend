


export function convertNewlines(response: string) {
    return response.split("\n").map(line => <>{line}<br/></>);
}