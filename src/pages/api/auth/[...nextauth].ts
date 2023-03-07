import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import useDynamoDBClient, { authorizeUser, getUserByEmail, putNewUser } from '@/adapters/dynamodb'
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter'
import { NextApiRequest, NextApiResponse } from 'next'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const authOptions: AuthOptions = {
        adapter: DynamoDBAdapter(useDynamoDBClient()),
        session: {
            strategy: "jwt"
        },
        callbacks: {
            session: async ({ session, token }) => {
                if (typeof session.user !== "undefined" && typeof token.sub !== "undefined") {
                    session.user.id = token.sub;
                }
                return session;
            },
        },
        providers: [
            // OAuth authentication providers...
            GoogleProvider({
                // @ts-ignore
                clientId: process.env.GOOGLE_ID,
                // @ts-ignore
                clientSecret: process.env.GOOGLE_SECRET,
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
                    return authorizeUser(credentials);
                }
            }),
        ]
    }
    return NextAuth(req, res, authOptions);
}


// export default NextAuth(authOptions);
