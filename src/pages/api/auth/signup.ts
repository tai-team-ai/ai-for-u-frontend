import useMongoDBClient from '@/adapters/mongodb'
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'
import { validateSignUp } from '@/utils/validation';


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
    let client = await useMongoDBClient();
    try {
        const users = client.db().collection("users");
        const userExists = await users.findOne({ email });
        if (userExists) {
            res.status(422).json({ message: `User already exists for email ${email}` });
            return;
        }
        const user = await users.insertOne({email, password: bcrypt.hashSync(password, 12)});
        res.status(201).json({message: "User created", ...user});
    }
    finally {
        client.close();
    }
}
