import React, {Component} from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import './thankyoupage.scss'
import Aux from '../../hoc/Aux'
import axios from 'axios'
import Loader from '../Loader/loader'

class ThankyouPage extends Component {

  constructor (props) {
    super (props)
    this.state = {
      success: null,
      contact: null,
      loading: true
    }
  }
  
  componentDidMount () {
    const base = this
    const { match } = this.props
    const { reference } = match.params

    var refArray = reference.split('?');

    if (reference === "contact") {
      this.setState({
        contact: true
      }, () => {
        this.endLoading()
      })
    }

    if ((typeof reference) && (reference !== "contact")) {
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
        const status = response.data.status
        const tickets = (response.data.data.amount) / 1000
        const success = status === "success" ? true : false
        base.setState({
          success: success
        }, () => {
          success ? this.sendToFirestore(tickets) : this.endLoading()
        })
      }).catch(error => {
        console.log(error)
        const success = false
        base.setState({
          success: success
        }, () => {
          this.endLoading()
        })
      })
    }
  }
  
  endLoading = () => {
    this.setState({
      loading: false,
    })
  }

  sendToFirestore = (tickets) => {
      const { userID, setTickets, updateProfilePaid, db } = this.props

      db.collection("userInfo").doc(userID).set({
        tickets: tickets
      }, { merge: true }).then(() => {
        console.log("Ticket Updated")
        setTickets(tickets)
        updateProfilePaid()
        this.endLoading()
      });
  }

  render () {
    const { success, contact, loading } = this.state
    const { loggedIn } = this.props

    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <Aux>
        <Grid className={'thankyoupage-container'}>
          <Grid.Column width={16}>

            {
              success === true &&

              <Container textAlign='center' style={{ marginTop: '20%' }}>
                <Header as="h2">
                  Thank you for paying for a ticket. You will receive an email confirmation soon
                </Header>

                <Container>
                  Return to <Link to="/welcome">dashboard</Link> to generate your ticket
                </Container>
              </Container>

            }

            {
              success === false &&

              <Container textAlign='center' style={{ marginTop: '20%' }}>
                <Header as="h2">
                  There was an error with your payment, and it was not processed
                </Header>

                <Container>
                  Please return to <Link to="/welcome">dashboard</Link> to try again
                </Container>
              </Container>

            }


            {
              contact === true &&

              <Container textAlign='center' style={{ marginTop: '20%' }}>
                <Header as="h2">
                  Thank you for reaching out to us. A member of the team will reach out to you soon
                </Header>

                <Container>
                  Return to <Link to="/">Home</Link>
                </Container>
              </Container>

            }

            {
              loading && 

              <Loader loading={loading} message={"Please wait"} />
            }

          </Grid.Column>
        </Grid>

      </Aux>
    )
  }
}

export default ThankyouPage
