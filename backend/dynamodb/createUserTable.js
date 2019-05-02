process.env.NODE_ENV ? require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}` }) : require('dotenv').config({ path: "../.env" })

const aws = require("aws-sdk");
const fs = require('fs');
const _ = require('lodash');

console.log("NODE_ENV = " + process.env.NODE_ENV)
console.log("Dynamo endpoint = " + process.env.DYNAMODB_ENDPOINT)

aws.config.update({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT
});

const dynamodb = new aws.DynamoDB();
const params = JSON.parse(fs.readFileSync("table-user.json"));  
params.TableName = `${params.TableName}-${process.env.STAGE}`
_.forEach(params.GlobalSecondaryIndexes, idx => {
    idx.IndexName = `${idx.IndexName}-${process.env.STAGE}`
})

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
