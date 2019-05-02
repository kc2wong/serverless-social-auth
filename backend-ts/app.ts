import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as passport from 'passport';
import serverless from "serverless-http";

import { router } from './src/handler';
require('./src/config/passport');

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use("/", router)

export const server = async (event: APIGatewayProxyEvent, context: Context) => {
    return await serverless(app)(event, context);
}
