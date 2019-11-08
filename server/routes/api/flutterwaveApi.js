
const fetch = require('node-fetch');
const axios = require('axios');

module.exports = (app) => {
  app.post('/flutterwave-initialize', (req, res) => {
    console.log(req.body)

    return fetch("https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay", {
      method: 'POST',
      body: JSON.stringify({
        "txref":"MC_15204435314ft",
        "PBFPubKey":"FLWPUBK-a4ae5b0f2e5ae9f4b81527f3e1b64ae5-X", 
        "customer_email": "adeola.adeyemoj@yahoo.com", 
        "amount": 1000, 
        "currency": "NGN", 
        "redirect_url": "/verify/"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
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
    const options = {
      headers: {
        
      }
    };

		return fetch(`https://api.flutterwave.co/transaction/verify/${req.body.reference}`, options)
		.then(res => res.json())
		.then(data => {
      console.log(data);
			res.send({ data });
		})
		.catch(err => {
			res.redirect('/error');
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