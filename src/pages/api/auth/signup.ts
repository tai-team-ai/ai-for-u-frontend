import { NextApiRequest, NextApiResponse } from 'next';
import { validateSignUp } from '@/utils/validation';
import { useDynamoDBAdapter } from '@/adapters/dynamodb';
import { hashSync } from 'bcrypt'; 'bcrypt';
import { v4 as uuid } from "uuid";


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
    const adapter = useDynamoDBAdapter();
    let user = await adapter.getUserByEmail(email);
    if(user) {
        res.status(422).json({message: `email ${email} already exists`});
        return;
    }
    user = await adapter.createUser({
        emailVerified: null,
        // @ts-ignore
        password: hashSync(password, 12),
        provider: "credentials",
        id: uuid(),
        email: email,
    });
    res.status(200).json({message: "Sign up successful!"});
}
