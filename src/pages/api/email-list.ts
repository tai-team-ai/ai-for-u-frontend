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
    let userId = req.headers["UUID".toLowerCase()]
    if (typeof userId === "undefined") {
        console.log(req.headers);
        res.status(403).json({message: "Forbidden"});  // a user id was not provided so the request possibly came from an outside entity (not a browser)
        return;
    }
    userId = userId as string;

    const {email} = req.body;
    await addEmailToEmailList(useDynamoDBClient(), {userId, email});
    res.status(200).json({message: "Thank you for subscribing"});
}
