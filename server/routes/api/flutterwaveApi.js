
const fetch = require('node-fetch');
const axios = require('axios');

module.exports = (app) => {
  app.post('/flutterwave-initialize', (req, res) => {
    console.log(req.body)

    return fetch("https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay", {
      method: 'POST',
      body: JSON.stringify({
        "txref":req.body.reference,
        "PBFPubKey":"FLWPUBK_TEST-ff9ddfa2ef023cbe71dbbd7da5aebbbf-X", 
        "customer_email": "adeola.adeyemoj@yahoo.com", 
        "amount": 1000, 
        "currency": "NGN",
        "redirect_url": `/thankyou/${req.body.reference}`
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
		.then(data => {
      console.log(data)
      res.send({ data });
		})
		.catch(err => {
      console.log(err)
			res.send({ err });
		});
	})

	app.post('/flutterwave-verify', (req, res) => {

		return fetch("https://api.flutterwave.co/transaction/verify", {
      method: 'POST',
      body: JSON.stringify({
        "txref":req.body.reference,
        "SECKEY":"FLWSECK_TEST-344f6f6da9f7840084921115d6f02a3d-X",
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
		.then(res => res.json())
		.then(data => {
      console.log(data);
			res.send({ data });
		})
		.catch(err => {
      console.log(err)
			res.send({ err });
		});
  })
  
  app.get('/flutterwave-transactions', (req, res) => {
    const options = {
      headers: {
        
      }
    };

		return fetch("https://api.flutterwave.co/transaction", options)
		.then(res => res.json())
		.then(data => {
      console.log(data)
      res.send({ data });
		})
		.catch(err => {
			res.send({err});
		});
  })
}