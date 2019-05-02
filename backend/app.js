// app.js 
const express = require('express')
const sls = require('serverless-http') 
const cors = require("cors");
const passport = require('passport');
const bodyParser = require("body-parser");

const handler = require('./src/handler')
require('./src/config/passport');

const app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());  

app.use("/", handler)

module.exports.server = sls(app)