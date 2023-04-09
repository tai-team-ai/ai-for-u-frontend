import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof process.env.API_URL === "undefined") {
        res.status(500);
        return;
    }
    const { task } = req.query;
    let statusCode = 200;
    const token = getToken({ req });
    fetch(
        `${process.env.API_URL}/ai-for-u/${task}`,
        {
            method: req.method,
            body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
            // @ts-ignore
            headers: {
                ["uuid"]: req.headers["uuid"],
                ["Content-Type"]: "application/json",
                ["Token"]: token,
            }
        }
    ).then(async response => {
        statusCode = response.status;
        if (response.status === 200) {
            return response.json();
        }
        throw await response.text();
    }).then(data => {
        res.status(statusCode).json(data);
    }).catch((reason) => {
        console.log(reason);
        res.status(statusCode).json({ message: reason });
    });
}