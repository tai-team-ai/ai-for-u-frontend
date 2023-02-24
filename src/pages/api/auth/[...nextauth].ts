import NextAuth, { AuthOptions } from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Adapter } from 'next-auth/adapters'


/** @return { import("next-auth/adapters").Adapter } */
function MyAdapter(client, options = {}): Adapter {
    return {
        async createUser(user) {
            return
        },
        async getUser(id) {
            return
        },
        async getUserByEmail(email) {
            return
        },
        async getUserByAccount({ providerAccountId, provider }) {
            return
        },
        async updateUser(user) {
            return
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
        async createSession({ sessionToken, userId, expires }) {
            return
        },
        async getSessionAndUser(sessionToken) {
            return
        },
        async updateSession({ sessionToken }) {
            return
        },
        async deleteSession(sessionToken) {
            return
        },
        async createVerificationToken({ identifier, expires, token }) {
            return
        },
        async useVerificationToken({ identifier, token }) {
            return
        },
    }
}

const authOptions: AuthOptions = NextAuth({
    adapter: MyAdapter(null),
    session: {
        strategy: "jwt"
    },
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        // Passwordless / email sign in
        // EmailProvider({
        //     server: {
        //         host: process.env.SMTP_HOST,
        //         port: Number(process.env.SMTP_PORT),
        //         auth: {
        //             user: process.env.SMTP_USER,
        //             pass: process.env.SMTP_PASSWORD,
        //         },
        //     },
        //     from: process.env.EMAIL_FROM,
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if(typeof credentials === "undefined") {
                    return null;
                }
                // TODO: Check sign in credentials
                if(credentials.username === "admin" && credentials.password === "admin") {
                    return { id: "1", name: "J Smith", email: "jsmith@example.com" }
                }
                return null;
            }
        }),
    ]
})

export default authOptions;