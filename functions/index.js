const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(bodyParser.json());

admin.initializeApp(functions.config().firebase);

// app.post('/email-attendee', (req, res) => {
//   // console.log(req.body)
//   // console.log('Request was made oooh')

//   // let transporter = nodemailer.createTransport({
//   //   service: 'gmail',
//   //   auth: {
//   //       user: 'adejoe97@gmail.com',
//   //       pass: 'dejoeart9715'
//   //   }
//   // });
    
//   // const dest = req.body.dest;

//   // const mailOptions = {
//   //     from: 'Adeola <adejoe97@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
//   //     to: dest,
//   //     subject: 'I\'M A PICKLE!!!', // email subject
//   //     html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
//   //         <br />
//   //         <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
//   //     ` // email content in HTML
//   // };

//   // return transporter.sendMail(mailOptions, (erro, info) => {
//   //     if(erro){
//   //         return res.send(erro.toString());
//   //     }
//   //     return res.send('Sended');
//   // });

//   return cors(req, res, () => {
//     var text = `<div>
//       <h4>Information</h4>
//       <ul>
//         <li>
//           Name -  Adeola
//         </li>
//         <li>
//           Email - meme
//         </li>
//         <li>
//           Phone - 012
//         </li>
//       </ul>
//       <h4>Message</h4>
//       <p>Helloo</p>
//     </div>`;
//      var sesAccessKey = 'adejoe97@gmail.com';
//      var sesSecretKey = 'dejoeart9715';

//      var transporter = nodemailer.createTransport(smtpTransport({
//       service: 'gmail',
//       auth: {
//           user: sesAccessKey,
//           pass: sesSecretKey
//       }
//     }));
//     const mailOptions = {
//       to: "adeola.adeyemoj@yahoo.com",
//       from: "no-reply@myemail.com",
//       subject: `Adeola sent you a new message`,
//       text: text,
//       html: text
//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//      if(error){
//         console.log(error.message);
//      }
//      res.status(200).send({
//        message: "success"
//      })
//     });
//   }).catch(() => {
//     res.status(500).send("error, I hate this stuff");
//   });
// }); 

exports.api = functions.https.onRequest(app);

exports.verify = functions.https.onCall((data, context) => {

  const { txref } = data
  return fetch("https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify", {
    method: 'POST',
    body: JSON.stringify({
      "txref":txref,
      "SECKEY":functions.config().flutterwave.testseckey
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
      "PBFPubKey":functions.config().flutterwave.testpubkey, 
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