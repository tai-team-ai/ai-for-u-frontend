import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid"


export default function useDynamoDBClient() {
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
    return client;
}

export async function getUserByEmail(client: DynamoDBDocument, email: string) {
    const data = await client.query({
        TableName: "next-auth",
        IndexName: "GSI1",
        KeyConditionExpression: "#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk",
        ExpressionAttributeNames: {
            "#gsi1pk": "GSI1PK",
            "#gsi1sk": "GSI1SK",
        },
        ExpressionAttributeValues: {
            ":gsi1pk": `USER#${email}`,
            ":gsi1sk": `USER#${email}`,
        },
    });
    return data;
}

interface AuthCredentials {
    email: string
    password: string
}

export async function authorizeUser({ email, password }: AuthCredentials) {
    const client = useDynamoDBClient();
    const data = await getUserByEmail(client, email);
    if (typeof data.Items === "undefined" || data.Items.length === 0) {
        return null;
    }
    const item = data.Items[0];
    if (!bcrypt.compareSync(password, item.password)) {
        return null;
    }
    return { id: email, name: email, email: email };
}

interface NewUserProps {
    email: string
    password: string
    userId?: string
}

export async function putNewUser(client: DynamoDBDocument, { email, password, userId }: NewUserProps) {
    if( typeof userId === "undefined") {
        userId = uuid();
    }
    password = bcrypt.hashSync(password, 12);
    const putOutput = await client.put({
        TableName: "next-auth",
        Item: {
            "pk": `USER#${userId}`,
            "sk": `USER#${userId}`,
            type: "USER",
            "GSI1PK": `USER#${email}`,
            "GSI1SK": `USER#${email}`,
            password: `${password}`
        },
    });
    return putOutput;
}
