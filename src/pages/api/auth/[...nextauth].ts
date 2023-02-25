import NextAuth, { AuthOptions, Awaitable } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Adapter, AdapterSession, AdapterUser, VerificationToken } from 'next-auth/adapters'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import useMongoDBClient from '@/adapters/mongodb'
import bcrypt from 'bcrypt'


/** @return { import("next-auth/adapters").Adapter } */
function NoopAdapter(options = {}): Adapter {
    return {
        async createUser(user): Promise<AdapterUser> {
            return { id: "", email: "", emailVerified: new Date() };
        },
        async getUser(id): Promise<AdapterUser> {
            return { id: "", email: "", emailVerified: new Date() };
        },
        async getUserByEmail(email): Promise<AdapterUser> {
            return { id: "", email: "", emailVerified: new Date() };
        },
        async getUserByAccount({ providerAccountId, provider }): Promise<AdapterUser> {
            return { id: "", email: "", emailVerified: new Date() };
        },
        async updateUser(user): Promise<AdapterUser> {
            return { id: "", email: "", emailVerified: new Date() };
        },
        async deleteUser(userId) {
            return
        },
        async linkAccount(account) {
            return
        },
        async unlinkAccount({ providerAccountId, provider }) {
            return
        },
        async createSession({ sessionToken, userId, expires }): Promise<AdapterSession> {
            return {sessionToken: "", userId: "", expires: new Date()}
        },
        async getSessionAndUser(sessionToken): Promise<{session: AdapterSession, user: AdapterUser}> {
            return {
                session: { sessionToken: "", userId: "", expires: new Date() },
                user: { id: "", email: "", emailVerified: new Date() }
            }
        },
        async updateSession({ sessionToken }): Promise<AdapterSession> {
            return { sessionToken: "", userId: "", expires: new Date() }
        },
        async deleteSession(sessionToken) {
            return
        },
        async createVerificationToken({ identifier, expires, token }): Promise<VerificationToken> {
            return {identifier: "", expires: new Date(), token: ""};
        },
        async useVerificationToken({ identifier, token }): Promise<VerificationToken> {
            return { identifier: "", expires: new Date(), token: "" };
        },
    }
}

let adapter = NoopAdapter();
if (typeof process.env.MONGODB_URI !== "undefined") {
    adapter = MongoDBAdapter(useMongoDBClient());
}

const authOptions: AuthOptions = NextAuth({
    adapter: adapter,
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
                // MongoDB is not defined, make admin the username and password
                // TODO: remove this debug code
                if (typeof process.env.MONGODB_URI === "undefined") {
                    if (credentials.email === "admin" && credentials.password === "admin") {
                        return {id: "1", name: "J smith", email: "jsmith@example.com" }
                    }
                    else {
                        return null;
                    }
                }
                // Get User from MongoDB
                const client = await useMongoDBClient();
                try {
                    const users = client.db().collection("users");
                    const result = await users.findOne({ email: credentials.email });
                    if (result === null) {
                        return null;
                    }
                    const matched = bcrypt.compareSync(credentials.password, result.password);
                    if(matched) {
                        return {id: result._id.toString(), name: credentials.email, email: credentials.email};
                    }
                }
                finally {
                    client.close();
                }
                return null;
            }
        }),
    ]
})

export default authOptions;