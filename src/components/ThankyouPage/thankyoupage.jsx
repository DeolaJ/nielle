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

    if (typeof reference) {
      return axios.post('/flutterwave-verify', {
        reference: reference
      }).then(response => {
        console.log(response)
      })
    }
  }

  render () {
    const { success } = this.state
    const { loggedIn } = this.props

    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <Aux>
        <Grid className={'thankyoupage-container'}>
          <Grid.Column width={16}>
            <Container textAlign='center' style={{ marginTop: '20%' }}>
              {
                success ?

                <Aux>
                  <Header as="h2">
                    Thank you for paying for a ticket. You will receive an email confirmation soon
                  </Header>

                  <Header as="h3">
                    However, if you will like to chat with someone now, click <a href="https://wa.me/2349057435025"  rel="noreferrer noopener" target={"_blank"}>here</a>
                  </Header>
                  <Container>
                    Return to <Link to="/welcome">dashboard</Link> to view your ticket
                  </Container>
                </Aux>

                : 

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
