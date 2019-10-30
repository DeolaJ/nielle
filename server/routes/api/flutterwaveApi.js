
const fetch = require('node-fetch');
const axios = require('axios');

module.exports = (app) => {
  app.post('/flutterwave-initialize', (req, res) => {
    console.log(req.body)

    return fetch("https://api.flutterwave.co/transaction/initialize", {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
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