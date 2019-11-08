import React, {Component} from 'react'
import { Grid, Container, Header, Button, Dropdown, Form } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import './welcome.scss'
import Aux from '../../hoc/Aux'
import firebase from '../../firebase'
import axios from 'axios'

class Welcome extends Component {

  constructor (props) {
    super (props)
    this.state = {
      db: {},
      loading: false,
      newUser: false,
      tickets: ""
    }
  }
  
  componentDidMount () {
    const { match, registerRemove, getUserInfo } = this.props
    const { type } = match.params
    const db = firebase.firestore()
    console.log(type)

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

  payNow = () => {
    const { tickets } = this.state
    const { email, full_name, timestamp } = this.props.userInfo
    var price = tickets && Number(tickets) * 1000
    const ref = this.getReference(full_name);

    if (typeof tickets) {
      return axios.post('/flutterwave-initialize',
        {
          "email": email,
          "amount": price,
          "currency": "NGN",
          "reference": ref,
          "callback_url": "/verify",
          "metadata": {
            "custom_fields": [
              {
                "full_name": full_name,
                "timestamp": timestamp
              }
            ]
          }
        }).then(response => {
        console.log(response)
        // return <Redirect to={response.url} />
      }).catch(error => {
        console.log(error);
      })
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render () {
    const { user, logOutUser, displayName, userInfo, loggedIn } = this.props
    const { tickets } = this.state
    var price = tickets && Number(tickets)*1000

    console.log(this.state)
    
    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <Aux>
        <Grid className={'welcome-container'}>
          <Grid.Column width={16}>
            <Container style={{ marginTop: '20%' }}>
              {
                user ?

                <Aux>
                  <Header as="h2" textAlign="left">
                    Welcome{' '}{userInfo && userInfo["full_name"]}
                  </Header>

                  <br/><br/>
                  {
                    displayName === "false" ?

                    <Aux>
                      <Header as="h3" textAlign="left">
                        <div>How many tickets will you like to pay for?</div>
                      </Header>
                      <Form>
                        <Form.Field>
                          <Form.Input type="number" value={tickets} name="tickets" label={`N${price}`} placeholder='Enter a number' onChange={this.handleChange}/>
                        </Form.Field>
                        <Button className={'primary-main ticket-button'} onClick={this.payNow}>Proceed to pay</Button>
                      </Form>
                    </Aux>

                    :

                    <Aux>
                      <Header as="h3">
                        Get ready to have a great time this December at the event. 
                        Hope you have the following items ready.
                      </Header>
                      <Container>
                        <div>
                          To view your ticket, click here
                        </div>
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
