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
    const { match } = this.props
    const { type } = match.params
    const db = firebase.firestore()
    
    this.setState({
      db: db
    }, () => {
      if (type === "newuser") {
        this.setNewUser()
      } else {
        this.props.getUserInfo()
      }
    })
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }
  
  endLoading = () => {
    const { status } = this.state;
    if (status === "success") {
      this.setState({
        loading: false,
        newUser: true,
        response: 'Your account was created successfully'
      })
    } else if ( status === "fail" ) {
      this.setState({
        response: 'Network error, Please wait while we try again. Do not refresh your browser'
      }, () => {
        this.setNewUser()
      })
    }
  }

  setNewUser = () => {
    const { userID, userInfo } = this.props
    const { db } = this.state
    const { email, name, description, gender, number, timestamp } = userInfo
    this.startLoading();
    db.collection("userInfo").doc(userID).set({
      "email": email,
      "full name": name,
      "description": description,
      "gender": gender,
      "number": number,
      "timestamp": timestamp
    }).then(() => {
      console.log("Document successfully written!");
      this.setState({
        status: "success"
      }, () => {
        setTimeout(this.endLoading(), 500);
      })
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      this.setState({
        status: "fail",
        errorMessage: error.message != null ? error.message : null
      }, () => {
        setTimeout(this.endLoading(), 500);
      })
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

    console.log(this.state, this.props)
    
    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <Aux>
        <Grid className={'welcome-container'}>
          <Grid.Column width={16}>
            <Container textAlign='center' style={{ marginTop: '20%' }}>
              {
                user ?

                <Aux>
                  <Header as="h2">
                    Welcome, <Button onClick={logOutUser}>Logout</Button>
                  </Header>

                  <br/><br/>
                  {
                    displayName === "false" ?

                    <Aux>
                      <Header as="h3">
                        <div>How many tickets will you like to pay for?</div>
                      </Header>
                      <Form>
                        <Form.Field>
                          <Form.Input type="number" value={tickets} name="tickets" label={price} placeholder='Enter a number' onChange={this.handleChange}/>
                        </Form.Field>
                        <Button onClick={this.payNow}>Proceed to pay</Button>
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
