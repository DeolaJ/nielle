import * as admin from 'firebase-admin';
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const main = express();

main.use(cors());
main.use(bodyParser.json());
main.use('/api/v1', app);

admin.initializeApp(functions.config().firebase);

exports.entries = functions.https.onRequest(app);