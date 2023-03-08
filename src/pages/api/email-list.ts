import { NextApiRequest, NextApiResponse } from "next";
import { validateEmail } from "@/utils/validation";
import useDynamoDBClient, {addEmailToEmailList} from "@/adapters/dynamodb";{ }


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST") {
        res.status(404).json({message: "request method not found"});
        return;
    }

    if(typeof req.body.email === "undefined" || !validateEmail(req.body.email)) {
        res.status(401).json({message: "Invalid Email"});
        return;
    }
    const {email} = req.body;
    await addEmailToEmailList(useDynamoDBClient(), {email});
    res.status(200).json({message: "Thank you for subscribing"});
}
