process.env.NODE_ENV ? require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}` }) : require('dotenv').config({ path: "../.env" })

const aws = require("aws-sdk");

console.log("Dynamo endpoint = " + process.env.DYNAMODB_ENDPOINT)

aws.config.update({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT
});
var dynamodb = new aws.DynamoDB();
var params = {
    TableName: `users-${process.env.STAGE}`,
};
dynamodb.deleteTable(params, function (err, data) {
    if (err) {
        console.error("Unable to deleted table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Delete table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});