const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const UserRepository = require('./userRepository').UserRepository;

const config = {
    "accessKeyId": process.env.DYNAMODB_ACCESS_KEY_ID,
    "secretAccessKey": process.env.DYNAMODB_SECRET_ACCESS_KEY,
    "region": process.env.DYNAMODB_REGION,
    "endpoint": process.env.DYNAMODB_ENDPOINT
}
const documentClient = new DocumentClient(config);

module.exports = {
    userRepository: new UserRepository(documentClient)
}