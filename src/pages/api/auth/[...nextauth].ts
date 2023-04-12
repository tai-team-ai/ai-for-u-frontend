import NextAuth, { type AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { type NextApiRequest, type NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { useDynamoDBAdapter } from '@/adapters/dynamodb'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const adapter = useDynamoDBAdapter()
  const authOptions: AuthOptions = {
    adapter,
    session: {
      strategy: 'jwt'
    },
    events: {
      signIn (message) {
        console.log('#### SIGN IN @@@@@')
        console.log(message)
      }
    },
    providers: [
      // OAuth authentication providers...
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text', placeholder: 'Email' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize (credentials, req) {
          if (typeof credentials === 'undefined') {
            return null
          }
          const { email, password } = credentials
          const user: any = await adapter.getUserByEmail(email)
          if (user !== null) {
            if (bcrypt.compareSync(password, user.password)) {
              return { id: user.id, name: email, email }
            }
          }
          return null
        }
      })
    ],
    pages: {
      signIn: '/'
    }
  }
  return NextAuth(req, res, authOptions)
}
