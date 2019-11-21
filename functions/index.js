const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const fetch = require('node-fetch');
const MailchimpApi = require('mailchimp-api-v3');
const md5 = require('crypto-js/md5');

const app = express();

app.use(cors());
app.use(bodyParser.json());

admin.initializeApp(functions.config().firebase);

const mailchimpApi = new MailchimpApi(functions.config().mailchimp.api)
const audienceId = functions.config().mailchimp.audience

exports.mailchimp = functions.https.onCall((data, context) => {

  const { userInfo, ticket } = data
  const body = {
    'status': 'subscribed',
    'merge_fields': {
      "TICKET": ticket
    },
    'interests': {
      'bf58f68599': true,
      '03b557ad6d': false
    }
  }
  const memberId = md5(userInfo.email.toLowerCase());

  return mailchimpApi.patch(`/lists/${audienceId}/members/${memberId}`, body);

})

exports.api = functions.https.onRequest(app);

exports.verify = functions.https.onCall((data, context) => {

  const { txref } = data
  return fetch("https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify", {
    method: 'POST',
    body: JSON.stringify({
      "txref":txref,
      "SECKEY":functions.config().flutterwave.seckey
      }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
  .then(data => {
    console.log(data)
    return data;
  })
  .catch(err => {
    console.log(err)
    return err;
  });
})


exports.pay = functions.https.onCall((data, context) => {

  const { email, name, timestamp, gender, price, tickets, ref } = data
  return fetch("https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay", {
    method: 'POST',
    body: JSON.stringify({
      "txref":ref,
      "PBFPubKey":functions.config().flutterwave.pubkey, 
      "customer_email": email, 
      "amount": price, 
      "currency": "NGN",
      "meta": [{"name": name, "timestamp": timestamp, "gender": gender, "tickets": tickets }],
      "redirect_url": `https://niellescookout.com/thankyou/${ref}`
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
  .then(data => {
    console.log(data)
    return data;
  })
  .catch(err => {
    console.log(err)
    return  err;
  });
})