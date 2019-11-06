import React, {Component} from 'react'
import { Grid, Header, Form, Button, Container, Transition, Message } from 'semantic-ui-react'
// import FileUploader from 'react-firebase-file-uploader';
import { Redirect } from 'react-router-dom'
import Aux from '../../hoc/Aux'
import firebase from '../../firebase'
import Loader from '../Loader/loader'
import './login.scss'

class Login extends Component {

  constructor (props) {
    super (props)
    this.state= {
      email: '',
      password: '',
      errorMessage: null,
      response: null,
      loading: false,
      emailValid: false,
      formValid: false,
      redirectTrue: null
    }

    this.startLoading = this.endLoading.bind(this)
    this.endLoading = this.endLoading.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }
  
  endLoading = () => {
    const { status, errorMessage } = this.state;
    if (status === "success") {
      this.setState({
        loading: false,
        email: '',
        password: '',
        response: 'You are logged in'
      }, () => {
        setTimeout(
          this.redirectWelcome,
          500);
      })

    } else if ( status === "fail" ) {
      setTimeout(() => (this.setState({ response: null })), 4000)
      this.setState({
        loading: false,
        response: errorMessage
      })
    }
  }

  handleChange = (e, { name, value }) => {
    if ( name === "email") {
      
      this.setState(
        { [name]: value }, 
          () => { this.validateField(name, value)
      })
    } else {
      this.setState({ [name]: value })
    }
  }

  validateField = (fieldName, value) => {
    let emailValid = this.state.emailValid;
  
    switch(fieldName) {
      case 'email':
        var re = /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
        emailValid = re.test(String(value).toLowerCase());
        // emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      default:
        break;
    }
    this.setState({
      emailValid: emailValid
    }, this.validateForm);
  }
  
  validateForm = () => {

    this.setState({
      formValid: this.state.emailValid
    });
  }

  redirectWelcome = () => {
    this.setState({ redirectTrue: true })
  }

  signIn = (e) => {
    e.preventDefault();
    const { email, password, formValid } = this.state
    if (formValid === false) {
      document.getElementById("email").focus()
    }

    if (formValid === true) {
      let status;
      this.startLoading();
      firebase.auth().signInWithEmailAndPassword(
        email,
        password
      ).then(() => {
        console.log("Successfully logged in");
        status = "success";
        this.setState({
          status: status,
        }, () => {
          setTimeout(this.endLoading(), 500);
        })
      })
      .catch((error) => {
        console.error("Error logging in", error);
        status = "fail";
        this.setState({
          status: status,
          errorMessage: error.message != null ? error.message : null
        }, () => {
          setTimeout(this.endLoading(), 500);
        })
        
      })
    }
  }

  render () {
    const { response, password, errorMessage, email, loading, redirectTrue } = this.state

    if (redirectTrue) {
      return <Redirect to="/welcome" />
    }

    return (
      <Aux>
        <Grid stackable className={'login-container'}>
          <Grid.Column width={16}>

            <div className={"login-form"}>

              <Header as="h2" textAlign="center">
                Login
              </Header>

              <Form>
            {
              errorMessage &&
              <div>
                <p>
                  {errorMessage}
                </p>
              </div>
            }
            
            <Form.Input id={'email'} type="email" required label={"Email address"} value={email} name="email" placeholder='Enter your email address' onChange={this.handleChange} />
            <Message
              error
              visible={(this.state.email.length > 0) && !this.state.emailValid}
              size="small"
            >
              <p>Email address is invalid</p>
            </Message>

            <Form.Input type="password" id={'password'} required label={"Password"} value={password} name="password" placeholder='Enter your password' onChange={this.handleChange} />
            
            <Button type='submit' className={'sign-button primary-main'} floated="right" onClick={this.signIn}>Login</Button>
          </Form>

            </div>
          </Grid.Column>
        </Grid>
        {
          response &&

          <Transition.Group animation={'fly left'} duration={700}>
            <Container className={'response-message'} textAlign="center">
              <p>{response}</p>
            </Container>
          </Transition.Group>
          
        }
        {
          loading && 

          <Loader loading={loading} message={"Logging in"} />
        }

      </Aux>
    )
  }
}

export default Login
