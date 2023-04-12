import { type NextApiRequest, type NextApiResponse } from 'next'
import { validateSignUp } from '@/utils/validation'
import { useDynamoDBAdapter } from '@/adapters/dynamodb'
import { hashSync } from 'bcrypt'
import { v4 as uuid } from 'uuid'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(500).json({ message: 'route not valid' })
  }
  const { email, password, confirmPassword } = req.body
  const errors = validateSignUp({ email, password, confirmPassword })
  if (errors.length > 0) {
    res.status(422).json({ message: errors.join('\n') })
    return
  }
  const adapter = useDynamoDBAdapter()
  let user = await adapter.getUserByEmail(email)
  if (user != null) {
    res.status(422).json({ message: `email ${email as string} already exists` })
    return
  }
  user = await adapter.createUser({
    emailVerified: null,
    // @ts-expect-error the usual adapter user doesn't include a password, but we are.
    password: hashSync(password, 12),
    provider: 'credentials',
    id: uuid(),
    email
  })
  res.status(200).json({ message: 'Sign up successful!' })
}
