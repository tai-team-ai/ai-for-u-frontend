import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter"


const useDynamoDBAdapter = () => {
    const config: DynamoDBClientConfig = {
        credentials: {
            accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
            secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY as string,
        },
        region: process.env.NEXT_AUTH_AWS_REGION,
    };

    const client = DynamoDBDocument.from(new DynamoDB(config), {
        marshallOptions: {
            convertEmptyValues: true,
            removeUndefinedValues: true,
            convertClassInstanceToMap: true,
        },
    });

    const adapter = DynamoDBAdapter(client);
    return adapter;
}

export {useDynamoDBAdapter};
