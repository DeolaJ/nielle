// const fetch = require('node-fetch');
// const axios = require('axios'); 
// const nodemailer = require("nodemailer")
// const cors = require('cors')

// module.exports = (app) => {

//   app.post('/email-attendee', (req, res) => {
//     console.log(req.body)
//     console.log('Request was made oooh')

//     // if(req.body.email === "" || req.body.name === "") {
//     //   res.send("Error: Full name or Email should not be Blank");
//     //   return false;
//     // }

//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//           user: 'adejoe97@gmail.com',
//           pass: 'dejoeart9715'
//       }
//     });
      
//         // getting dest email by query string
//         const dest = req.body.dest;

//         const mailOptions = {
//             from: 'Adeola <adejoe97@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
//             to: dest,
//             subject: 'I\'M A PICKLE!!!', // email subject
//             html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
//                 <br />
//                 <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
//             ` // email content in HTML
//         };
  
//         // returning result
//         return transporter.sendMail(mailOptions, (erro, info) => {
//             if(erro){
//                 return res.send(erro.toString());
//             }
//             return res.send('Sended');
//         });
//     }); 
// }