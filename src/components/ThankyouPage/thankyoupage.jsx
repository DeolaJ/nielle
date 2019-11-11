import React, {Component} from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import './thankyoupage.scss'
import Aux from '../../hoc/Aux'
import axios from 'axios'

class ThankyouPage extends Component {

  constructor (props) {
    super (props)
    this.state = {
      mobile: null,
      success: null
    }
  }
  
  componentDidMount () {
    const base = this
    const { match } = this.props
    const { reference } = match.params
    console.log(reference)
    var mobile = this.state.mobile;
    if (!mobile) {
      const body = document.querySelector('.thankyoupage-container').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile: mobile
      })
    }

    var refArray = reference.split('?');

    if (typeof reference) {
      return axios({
        method: 'post',
        url: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify',
        data: JSON.stringify({
        "txref":refArray[0],
        "SECKEY":"FLWSECK_TEST-344f6f6da9f7840084921115d6f02a3d-X"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        console.log(response)
        const status = response.data.status
        const tickets = (response.data.data.amount) / 1000
        const success = status === "success" ? true : false
        console.log(status, success, tickets)
        base.setState({
          success: success
        }, () => {
          this.sendToFirestore(tickets)
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }

  sendToFirestore = (tickets) => {
      const { userID, setTickets, updateProfilePaid, db } = this.props

      db.collection("userInfo").doc(userID).set({
        tickets: tickets
      }, { merge: true }).then(() => {
        console.log("Ticket Updated")
        setTickets(tickets)
        updateProfilePaid()
      });
  }

  render () {
    const { success } = this.state
    const { loggedIn } = this.props

    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    console.log(this.state)

    return (
      <Aux>
        <Grid className={'thankyoupage-container'}>
          <Grid.Column width={16}>
            <Container textAlign='center' style={{ marginTop: '20%' }}>
              {
                success === true &&

                <Aux>
                  <Header as="h2">
                    Thank you for paying for a ticket. You will receive an email confirmation soon
                  </Header>

                  <Container>
                    Return to <Link to="/welcome">dashboard</Link> to generate your ticket
                  </Container>
                </Aux>

              }

              {
                success === false &&

                <Aux>
                  <Header as="h2">
                    There was an error with your payment, and it was not processed
                  </Header>

                  <Container>
                    Please return to <Link to="/welcome">dashboard</Link> to try again
                  </Container>
                </Aux>

              }
            </Container>
          </Grid.Column>
        </Grid>

      </Aux>
    )
  }
}

export default ThankyouPage
