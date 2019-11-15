import React, {Component} from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import './thankyoupage.scss'
import firebase from '../../firebase'
import Aux from '../../hoc/Aux'
import Loader from '../Loader/loader'

class ThankyouPage extends Component {

  constructor (props) {
    super (props)
    this.state = {
      success: null,
      contact: null,
      loading: true,
      vendorSuccess: null,
      vendorFail: null,
      tickets: null
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
    } else if (reference === "vendor-success") {
      this.setState({
        vendorSuccess: true
      }, () => {
        this.endLoading()
      })
    } else if (reference === "vendor-fail") {
      this.setState({
        vendorFail: true
      }, () => {
        this.endLoading()
      })
    }

    var verify = firebase.functions().httpsCallable('verify');

    const data = {
      txref: refArray[0]
    }

    if ((typeof reference) && (reference !== "contact") && (reference !== "vendor-success") && (reference !== "vendor-fail") ) {
      return verify(data).then(response => {
        console.log(data)
        const status = response.data.data.status
        const tickets = Math.floor((response.data.data.amount) / 1000)
        const success = status && (status === "successful") ? true : false
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
  
  endLoading = (tickets) => {
    this.setState({
      loading: false,
      tickets: tickets ? tickets : null
    })
  }

  sendToFirestore = (tickets) => {
      const { userID, setTickets, updateProfilePaid, db } = this.props

      db.collection("userInfo").doc(userID).set({
        tickets: tickets
      }, { merge: true }).then(() => {
        console.log("Ticket Updated")
        setTickets(tickets)
      }).then(() => {
        updateProfilePaid()
        this.endLoading(tickets)
      });
  }

  render () {
    const { success, contact, loading, vendorFail, vendorSuccess, tickets } = this.state
    const { loggedIn } = this.props

    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <Aux>
        <Grid className={'thankyoupage-container'}>
          <Grid.Column width={16}>

            {
              success === true && tickets &&

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
              vendorSuccess === true &&

              <Container textAlign='center' style={{ marginTop: '20%' }}>
                <Header as="h2">
                  Thank you for paying a a Vendor. A member of the team will reach out to you soon
                </Header>

                <Container>
                  Return to <Link to="/">Home</Link>
                </Container>
              </Container>

            }


            {
              vendorFail === true &&

              <Container textAlign='center' style={{ marginTop: '20%' }}>
                <Header as="h2">
                  There was an issue with your payment. Please pay again using this <a href={"https://rave.flutterwave.com/pay/vendor-registration"} rel="noopener noreferer" target={"_blank"}>link</a>
                </Header>

                <Container>
                  Return to <Link to="/">Home</Link>
                </Container>
              </Container>

            }

            {
              loading && 

              <Loader loading={loading} message={"Hold tight, while we update your details"} />
            }

          </Grid.Column>
        </Grid>

      </Aux>
    )
  }
}

export default ThankyouPage
