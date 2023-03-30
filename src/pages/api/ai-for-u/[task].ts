import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof process.env.API_URL === "undefined") {
        res.status(500);
        return;
    }
    const {task} = req.query;
    const response = await fetch(
        `${process.env.API_URL}/ai-for-u/${task}`,
        {
            method: req.method,
            body: JSON.stringify(req.body),
            // @ts-ignore
            headers: {
                ["uuid"]: req.headers["uuid"],
                ["Content-Type"]: "application/json",
                ["Token"]: req.cookies["next-auth.csrf-token"],
            }})
    const body = await response.json();
    res.status(response.status).json(body);
}