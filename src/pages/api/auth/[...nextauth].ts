import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"

import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { useDynamoDBAdapter } from '@/adapters/dynamodb'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const adapter = useDynamoDBAdapter();
    const authOptions: AuthOptions = {
        adapter: adapter,
        session: {
            strategy: "jwt"
        },
        events: {
            signIn(message) {
                console.log("#### SIGN IN @@@@@");
                console.log(message)
            }
        },
        providers: [
            // OAuth authentication providers...
            GoogleProvider({
                clientId: process.env.GOOGLE_ID as string,
                clientSecret: process.env.GOOGLE_SECRET as string,
            }),
            CredentialsProvider({
                name: "Credentials",
                credentials: {
                    email: { label: "Email", type: "text", placeholder: "Email" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req) {
                    if (typeof credentials === "undefined") {
                        return null;
                    }
                    const {email, password} = credentials;
                    const user: any = await adapter.getUserByEmail(email);
                    if(user) {
                        if(bcrypt.compareSync(password, user.password)) {
                            return { id: user.id, name: email, email: email };
                        }
                    }
                    return null;
                }
            }),
        ],
        pages: {
            signIn: "/",
        }
    }
    return NextAuth(req, res, authOptions);
}
