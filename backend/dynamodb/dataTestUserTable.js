process.env.NODE_ENV ? require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}` }) : require('dotenv').config({ path: "../.env" })

const aws = require("aws-sdk");
const User = require('../src/model/user')
const UserRepository = require('../src/repo/userRepository').UserRepository

console.log("Dynamo endpoint = " + process.env.DYNAMODB_ENDPOINT)

aws.config.update({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT
});
const docClient = new aws.DynamoDB.DocumentClient();

const userRepo = new UserRepository(docClient)

async function dataTest() {
    const u = new User("kc2wong@hotmail.com", "Kelvin Wong", "https://avatars1.githubusercontent.com/u/25499134?v=4", "github", "25499134")
    await userRepo.put(u)
    console.log("Insert user success");

    const userById = await userRepo.getById(u.id)
    console.log("Get By Id succeeded:", JSON.stringify(userById, null, 2));

    const userByEmail = await userRepo.getByEmail(u.email)
    console.log("Get By Email succeeded:", JSON.stringify(userByEmail, null, 2));
}
dataTest().catch(err => {
    console.error(err)
})
