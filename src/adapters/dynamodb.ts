import { secrets } from '@/utils/constants'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter'
import { type Adapter } from 'next-auth/adapters'

const useDynamoDBAdapter = (): Adapter<boolean> => {
  const config = {
    credentials: {
      accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
      secretAccessKey: secrets.NEXT_AUTH_AWS_SECRET_KEY
    },
    region: process.env.NEXT_AUTH_AWS_REGION
  }

  const client = DynamoDBDocument.from(new DynamoDB(config), {
    marshallOptions: {
      convertEmptyValues: true,
      removeUndefinedValues: true,
      convertClassInstanceToMap: true
    }
  })

  const adapter = DynamoDBAdapter(client)
  return adapter
}

export { useDynamoDBAdapter }
