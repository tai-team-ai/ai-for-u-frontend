import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof process.env.API_URL === "undefined") {
        res.status(500);
        return;
    }
    const {task} = req.query;
    res.redirect(`${process.env.API_URL}/ai-for-u/${task}`);
}