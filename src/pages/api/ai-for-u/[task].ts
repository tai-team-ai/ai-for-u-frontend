import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof process.env.API_URL === "undefined") {
        res.status(500);
        return;
    }
    const {task} = req.query;
    const token = await getToken({req, raw: true});
    const response = await fetch(
        `${process.env.API_URL}/ai-for-u/${task}`,
        {
            method: req.method,
            body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
            //@ts-ignore
            headers: {
                ["token"]: token ? token : undefined,
                ["Content-Type"]: "application/json",
                ["uuid"]: req.headers["uuid"],
            }
        }
    );
    const body = await response.text();
    console.log(body)
    res.status(response.status).json(body);
}