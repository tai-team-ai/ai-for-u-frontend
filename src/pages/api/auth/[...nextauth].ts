import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import useDynamoDBClient, { authorizeUser } from '@/adapters/dynamodb'
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter'


const authOptions: AuthOptions = {
    adapter: DynamoDBAdapter(useDynamoDBClient()),
    session: {
        strategy: "jwt"
    },
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if(typeof credentials === "undefined") {
                    return null;
                }
                return authorizeUser(credentials);
            }
        }),
    ]
}

export default NextAuth(authOptions);
