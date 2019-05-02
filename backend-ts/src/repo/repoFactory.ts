import { DynamoDB } from 'aws-sdk';

import { UserRepository } from './userRepository';

const config = {
    "accessKeyId": process.env.DYNAMODB_ACCESS_KEY_ID,
    "secretAccessKey": process.env.DYNAMODB_SECRET_ACCESS_KEY,
    "region": process.env.DYNAMODB_REGION,
    "endpoint": process.env.DYNAMODB_ENDPOINT
}
const documentClient = new DynamoDB.DocumentClient(config)
const userRepository = new UserRepository(documentClient)
export { userRepository }
