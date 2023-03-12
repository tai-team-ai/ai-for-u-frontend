import { NextApiRequest, NextApiResponse } from "next";

// TODO: remove this once the endpoint is working
export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({gptResponse: req.body.userMessage});
}