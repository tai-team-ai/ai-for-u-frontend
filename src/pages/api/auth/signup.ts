import { NextApiRequest, NextApiResponse } from 'next';
import { validateSignUp } from '@/utils/validation';
import useDynamoDBClient, {getUserByEmail, putNewUser} from '@/adapters/dynamodb';


export default async function (req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") {
        res.status(500).json({message: "route not valid"});
    }
    const {email, password, confirmPassword} = req.body;
    const errors = validateSignUp({email, password, confirmPassword});
    if(errors.length > 0) {
        res.status(422).json({message: errors.join("\n")});
        return;
    }
    const client = useDynamoDBClient();
    const data = await getUserByEmail(client, email);
    if(typeof data.Items === "undefined" || data.Items.length === 0) {
        const putOutput = await putNewUser(client, {email, password});
        if (typeof putOutput.$metadata.httpStatusCode !== "undefined") {
            res.status(putOutput.$metadata.httpStatusCode).json({ message: putOutput.ItemCollectionMetrics?.ItemCollectionKey });
        }
        else {
            res.status(201).json({ message: "User created" });
        }
        return;
    }
    res.status(422).json({ message: `User already exists for email ${email}` });
    return;
}
