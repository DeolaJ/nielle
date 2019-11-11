import React, {Component} from 'react'
import { Grid, Container, Header, Button, Modal, Form } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import './welcome.scss'
import Aux from '../../hoc/Aux'
import firebase from '../../firebase'
import axios from 'axios'
import QRCode from 'qrcode'
require('firebase/functions')

class Welcome extends Component {

  constructor (props) {
    super (props)
    this.state = {
      db: {},
      modalOpen: false,
      newUser: false,
      tickets: "",
      qrCode: null
    }
  }
  
  componentDidMount () {
    const { match, registerRemove, getUserInfo, userInfo } = this.props
    const { type } = match.params
    const db = firebase.firestore()

    console.log(type)

    userInfo && userInfo.qrCode && this.setState({ qrCode: userInfo.qrCode })

    userInfo && userInfo.tickets && this.setState({ tickets: userInfo.tickets })

    this.setState({
      db: db
    }, () => {
      if (type === "newuser") {
        registerRemove()
      } else {
        getUserInfo()
      }
    })
  }

  getReference = (full_name) => {
    let text = full_name;
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for( let i=0; i < 15; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


  handleOpen = (reference) => this.setState({ reference, modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  payNow = () => {
    const { tickets } = this.state
    const { email, name, timestamp, gender } = this.props.userInfo
    var price = tickets && Number(tickets) * 1000
    const ref = this.getReference(name);

    var functions = firebase.functions();

    if (typeof tickets) {
      
      return axios({
        method: 'post',
        url: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay',
        data: JSON.stringify({
          "txref":ref,
          "PBFPubKey": "FLWPUBK_TEST-ff9ddfa2ef023cbe71dbbd7da5aebbbf-X", 
          "customer_email": email, 
          "amount": price, 
          "currency": "NGN",
          "meta": [{"name": name, "timestamp": timestamp, "gender": gender, "tickets": tickets }],
          "redirect_url": `https://nielle-19.firebaseapp.com/thankyou/${ref}`
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        console.log(response)
        window.location.href = response.data.data.link
      }).catch(error => {
        console.log(error)
      })
        // {
        //   PBFPubKey: "",
        //   "email": email,
        //   "amount": price,
        //   "currency": "NGN",
        //   "txref": ref,
        //   "meta": [{"name": name, "timestamp": timestamp, "gender": gender }],
        //   callback: function(response) {
        //     let txref = response.tx.txRef 
        //     let chargeResponse = response.tx.chargeResponseCode

        //     if (chargeResponse === "00" || chargeResponse === "0") {
        //       return axios.post('flutterwave-verify',
        //         {
        //           PBFSecKey: "",
        //           txref: txref
        //         }).then(response => {
        //           window.location = "http://localhost:8088/verify/thank-you"; //Add your success page here
        //         }).catch(error => {
        //           console.log(error);
        //         })
        //     } else {
        //       window.location = "http://localhost:8088/verify/failed";  //Add your failure page here
        //     }
        //   }
        // }).then(response => {
        //   console.log(response)
        //   // return <Redirect to={response.url} />
        // }).catch(error => {
        //   console.log(error);
        // })
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  generateQR = () => {
    const { userInfo } = this.props
    const { name, timestamp, tickets } = userInfo
    const base = this
    var canvas = document.getElementById('canvas')
    var barcodeContainer = document.querySelector('.barcode-image')
    // var opts = {
    //   errorCorrectionLevel: 'H',
    //   type: 'image/png',
    //   width: 100,
    //   quality: 0.3,
    //   margin: 1,
    //   color: {
    //     dark:"#010599FF",
    //     light:"#FFBF60FF"
    //   }
    // }
    
    QRCode.toCanvas(canvas, `${name} bought ${tickets} tickets and registered at ${timestamp}`, function (error) {
      if (error) {
        console.error(error)
      } else {
        console.log('success!');
        let canvas = document.getElementById('canvas')
        var dataUrl = canvas.toDataURL();
        var imageFoo = document.createElement('img');
        imageFoo.src = dataUrl;
        barcodeContainer.appendChild(imageFoo);
        base.setState({
          qrCode: dataUrl
        }, () => {
          base.sendToFirestore()
        })
      }
    })
  }

  sendToFirestore = () => {
    const { db, qrCode } = this.state
    const { userID, setQr } = this.props

    db.collection("userInfo").doc(userID).set({
      qrCode: qrCode
    }, { merge: true }).then(() => {
      console.log("Document successfully written!")
      setQr(qrCode)
    });
  }

  sendMail = () => {
    return axios.post('https://us-central1-nielle-19.cloudfunctions.net/api/email-attendee',{
      dest: 'adeola.adeyemoj@yahoo.com'
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  render () {
    const { user, displayName, userInfo, loggedIn } = this.props
    const { tickets, qrCode } = this.state
    var price = tickets && Number(tickets)*1000
    var FinalPrice = price && `N${price}`

    console.log(this.state)
    
    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <Aux>
        <Grid className={'welcome-container'}>
          <Grid.Column width={16}>
            <Container className={'welcome-body'} style={{ marginTop: '20%' }}>
              {
                user ?

                <Aux>
                  <Header as="h2" textAlign="left">
                    Welcome{' '}{userInfo && userInfo.name}
                  </Header>

                  <br/><br/>
                  {
                    displayName === "false" ?

                    <Aux>
                      <div className={"pay-section"}>
    
                        <Header as="h3">
                          Buy Ticket <span className={"ticket-cost"}>{FinalPrice}</span>
                        </Header>

                        <Form>
                          <Form.Field>
                            <Form.Input type="number" value={tickets} name="tickets" label={"How many tickets will you like to pay for?"} placeholder='Enter a number' onChange={this.handleChange}/>
                          </Form.Field>
                          <Button className={'primary-main ticket-button'} onClick={this.payNow}>Proceed to pay</Button>
                        </Form>
                        
                      </div>
                    </Aux>

                    :

                    <Aux>
                      <Header as="h3">
                        Get ready to have a great time this December at the event. 
                        Hope you have the following items ready.
                      </Header>
                      <Container className={"ticket-section"}>
                        <Header as="h3">
                          Ticket
                        </Header>
                        {
                          (userInfo && userInfo.qrCode) ?

                          <Grid stackable columns={2}>
                            <Grid.Column>
                              <div>
                                <p>
                                  {userInfo.name}
                                  <br/>
                                  {userInfo.email}
                                  <br/>
                                  This ticket admits {userInfo.tickets} attendee{userInfo.tickets > 1 && "s"}
                                  <br/>
                                  Date: 7 - DEC - 2019
                                  <br/>
                                  Venue: 49, Abiola Crescent off Toyin street Ikeja
                                  <br/>
                                  Time: 12pm
                                </p>
                              </div>
                            </Grid.Column>
                            
                            <Grid.Column>
                              <div style={{ textAlign: "right" }}>
                                <div className="barcode-image">
                                  { 
                                    qrCode && 

                                    <img src={qrCode} alt="Ticket QR Code" />

                                  }
                                  
                                </div>
                              </div>
                            </Grid.Column>
                          </Grid>

                          :

                          <Aux>
                            {
                              (userInfo && userInfo.tickets) &&

                              <Aux>
                                <div>
                                  To generate your ticket, click  <Button className={'primary-main generate-ticket'} onClick={this.generateQR}>Generate Ticket</Button>
                                </div>
                                <canvas id="canvas"></canvas>
                                <div className='barcode-image'></div>
                              </Aux>
                            }
                          </Aux>
                        }
                      </Container>
                    </Aux>
                  }
                </Aux>

                :

                <Container>
                  You are not logged in, click <Link to="/login">here</Link> to login
                </Container>

              }

            </Container>
          </Grid.Column>
        </Grid>
      </Aux>
    )
  }
}

export default Welcome
