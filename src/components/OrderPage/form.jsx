import React, {Component} from 'react'
import { Form, Button, Container, Transition, TextArea, Message } from 'semantic-ui-react'
// import FileUploader from 'react-firebase-file-uploader';
import { Redirect } from 'react-router-dom'
import Aux from '../../hoc/Aux'
import firebase from '../../firebase'
import Loader from '../Loader/loader'

class CheckoutForm extends Component {

  constructor (props) {
    super (props)
    this.state= {
      email: '',
      password: '',
      full_name: '',
      description: '',
      username: '',
      gender: '',
      number: '',
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
    const { status } = this.state;
    
    if ( status === "fail" ) {
      setTimeout(() => (this.setState({ response: null })), 4000)
      this.setState({
        loading: false,
        response: 'There was an error. Please try again'
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

  orderNow = (e) => {
    e.preventDefault();
    const { email, password, username, full_name, description, gender, number, formValid } = this.state
    const { registerUser, unloadForm } = this.props
    let timestamp = Date();
    timestamp = timestamp.toString();
    if (formValid === false) {
      document.getElementById("email").focus()
    }

    if (formValid === true) {
      this.startLoading();
      firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      ).then(() => {
        unloadForm();
        registerUser({
          email: email,
          username: username,
          name: full_name,
          description: description,
          gender: gender,
          number: number,
          timestamp: timestamp
        }, this.redirectWelcome)
      }).catch(error => {
        this.setState({
          status: "fail",
          errorMessage: error.message != null ? error.message : null
        }, () => {
          setTimeout(this.endLoading(), 500);
        })
      })
      
    }
  }

  render () {
    const { gender, response, password, errorMessage, username,
      email, full_name, description, number, loading, redirectTrue
    } = this.state
    
    const genders = [
      { key: 'm', text: 'Male', value: 'Male' },
      { key: 'f', text: 'Female', value: 'Female' }
    ]

    console.log(this.state)
    if (redirectTrue) {
      return <Redirect to="/welcome/newuser" />
    }

    return (
      <Aux>

        <Form>
          {
            errorMessage &&
            <div>
              <p>
                {errorMessage}
              </p>
            </div>
          }
          <Form.Input width={16} type="text" required label={"Full name"} value={full_name} name="full_name" placeholder='First name, Last name' onChange={this.handleChange} />
          
          <Form.Input id={'email'} type="email" required label={"Email address"} value={email} name="email" placeholder='Enter your email address' onChange={this.handleChange} />
          <Message
            error
            visible={(this.state.email.length > 0) && !this.state.emailValid}
            size="small"
          >
            <p>Email address is invalid</p>
          </Message>

          <Form.Input width={16} type="text" required label={"Username"} value={username} name="username" placeholder='Choose a username' onChange={this.handleChange} />
          <Form.Input type="password" id={'password'} required label={"Password (to pay or view your tickets later)"} value={password} name="password" placeholder='Create a password' onChange={this.handleChange} />
          <Form.Input type="number" id={'number'} required label={"Phone number"} value={number} name="number" placeholder='+234 - - - - - - - - - -' onChange={this.handleChange} />
          <Form.Select options={genders} label={"Gender (OPTIONAL)"} value={gender} name="gender" placeholder='Select Gender' onChange={this.handleChange} />
          <Form.Field>
            <label htmlFor={"description"}>Brief Description (OPTIONAL)</label>
            <TextArea placeholder='Enter a brief description of your order' value={description} id={"description"} rows={2} name="description" onChange={this.handleChange}></TextArea>
          </Form.Field>
          <Button type='submit' className={'order-button'} floated="right" onClick={this.orderNow}>Place an Order</Button>
        </Form>

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

          <Loader loading={loading} message={"Processing request"} />
        }

      </Aux>
    )
  }
}

export default CheckoutForm
