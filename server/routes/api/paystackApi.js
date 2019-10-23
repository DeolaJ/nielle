
const fetch = require('node-fetch');
const axios = require('axios');

module.exports = (app) => {
  // let reference;
  // let API_KEY = "sk_test_9d3078d3ee64c074c1140478cc4bbba3865c1da0"

	app.post('/paystack-initialize', (req, res) => {
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: "adeola@formpl.us"
    //   }),
    //   headers: {
    //     'Authorization':  'BEARER sk_test_9d3078d3ee64c074c1140478cc4bbba3865c1da0',
    //     "Content-Type": "application/json"
    //   }
    // };
    console.log(req.body)
    console.log('Request wass made oooh')

    return fetch("https://api.paystack.co/transaction/initialize", {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Authorization':  'BEARER sk_test_9d3078d3ee64c074c1140478cc4bbba3865c1da0',
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

	app.post('/paystack-verify', (req, res) => {
    const options = {
      headers: {
        'Authorization':  'BEARER sk_test_9d3078d3ee64c074c1140478cc4bbba3865c1da0'
      }
    };

		return fetch(`https://api.paystack.co/transaction/verify/${req.body.reference}`, options)
		.then(res => res.json())
		.then(data => {
      console.log(data);
			res.send({ data });
		})
		.catch(err => {
			res.redirect('/error');
		});

  })
  
  app.get('/paystack-transactions', (req, res) => {
    const options = {
      headers: {
        'Authorization':  'BEARER sk_test_9d3078d3ee64c074c1140478cc4bbba3865c1da0'
      }
    };

		return fetch("https://api.paystack.co/transaction", options)
		.then(res => res.json())
		.then(data => {
      console.log(data)
      res.send({ data });
		})
		.catch(err => {
			res.send({err});
		});
  })

  app.get('/verify/callback', (req,res) => {
    const ref = req.query.reference;
    const options = {
      headers: {
        'Authorization':  'BEARER sk_test_9d3078d3ee64c074c1140478cc4bbba3865c1da0'
      }
    }
    return fetch(`https://api.paystack.co/transaction/verify/${ref}`, options)
		.then(res => res.json())
		.then(data => {
      console.log(data);
      
      if (data.message === "Verification successful") {
        res.end('<html><body><p>Redirecting...</p><script>window.top.location.href="/verify/thank-you"</script></body></html>')
      } else {
        res.end('<html><body><p>Redirecting...</p><script>window.top.location.href="/verify/failed"</script></body></html>')
      }
		})
		.catch(err => {
			res.redirect('/error');
		});
    // res.redirect('/receipt/'+donor._id)
    // console.log(ref)
  })
}

// return paystack.transaction.initialize({
  //   // "key": 'pk_live_387c32c52fbfe4eeaf07f6d70be6a1d9222f2a00',
  //   "email": email,
  //   "amount": amount,
  //   "currency": currency,
  //   "reference": this.getReference,
  //   callback_url: "localhost:3000/llll",
  //   "metadata": {
  //     "custom_fields": [
  //       {
  //         "first_name": first_name,
  //         "last_name": last_name,
  //         "consultant": consultant,
  //         "description": description,
  //         "address": address
  //       }
  //     ]
  //   }
  // }).then(response => {
  //   // const modal = document.querySelector('.modal')
  //   console.log(response)
  //   this.handleOpen()
  //   const iframe = document.querySelector('.modal iframe')
  //   iframe.setAttribute('src', response.data.authorization_url);
  // }).then(response => {
  //   console.log(response)
  // })
  // .catch(error => {
  //   console.log(error);
  // });