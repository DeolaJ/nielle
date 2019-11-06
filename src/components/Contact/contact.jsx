import React, {Component} from 'react'
import { Grid, Header, Container, Form, Button, Transition, Message, TextArea } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import './contact.scss'
import firebase from '../../firebase'
import Loader from '../Loader/loader'

class Contact extends Component {

  constructor (props) {
    super (props)
    this.state= {
      loading: false,
      email: '',
      full_name: '',
      message: '',
      db: {},
      emailValid: false,
      formValid: false,
      mobile: null,
      response: null,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    window.addEventListener("resize", this.updateValue);
    var db = firebase.firestore();
    var { mobile } = this.state;

    if (!mobile) {
      const body = document.querySelector('body').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile,
        db
      })
    }
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  endLoading = () => {
    const { status } = this.state;
    // console.log("status inside end loading:" + status)
    if (status === "success") {
      this.setState({
        loading: false,
        email: '',
        full_name: '',
        message: '',
        response: 'Your message was sent successfully'
      })

      setTimeout(
        function () {
          document.location.href = '/#/thankyou/contact'
        },
        500);
    } else if ( status === "fail" ) {
      setTimeout(() => (this.setState({ response: null })), 4000)
      this.setState({
        loading: false,
        response: 'There was an error. Please try again'
      })
    }
  }

  getReference = () => {
    const { full_name } = this.state;
    let text = full_name;
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for( let i=0; i < 15; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  
  validateForm = () => {

    this.setState({
      formValid: this.state.emailValid
    });
  }

  updateValue = () => {
    const body = document.querySelector('.contact-container').clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
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

  sendMessage = () => {
    const { email, full_name, message, formValid } = this.state
    let timestamp = Date();
    var ref = this.getReference();
    timestamp = timestamp.toString();

    if (formValid === false) {
      document.getElementById("email").focus()
    }

    if (formValid === true) {
      let status;
      this.startLoading();
      const { db } = this.state;
      db.collection("contact").doc(ref).set({
        "email": email,
        "name": full_name,
        "message": message,
        "timestamp": timestamp
      }).then(() => {
        console.log("Document successfully written!");
        status = "success";
        this.setState({
          status: status,
          timestamp: timestamp,
          ref: ref
        })
        setTimeout(this.endLoading(), 500);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        status = "fail";
        this.setState({
          status: status
        })
        setTimeout(this.endLoading(), 500);
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateValue)
  }

  render () {

    const { email, full_name, message, loading, response } = this.state;
    const { loggedIn } = this.props

    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <Grid stackable className={'contact-container'}>
        <Grid.Column width={16}>

          <div className={"contact-form"}>

            <Header as="h2" textAlign="center">
              Contact Us
              <Header.Subheader>For requests and enquiries</Header.Subheader>
            </Header>

            <Form>
              <Form.Input width={16} required label={"Full name"} value={full_name} name="full_name" placeholder='First name, Last name' onChange={this.handleChange} />
              
              <Form.Input id={'email'} width={16} required label={"Email address"} value={email} name="email" placeholder='Enter your email address' onChange={this.handleChange} />
              <Message
                error
                visible={(this.state.email.length > 0) && !this.state.emailValid}
                size="small"
              >
                <p>Email address is invalid</p>
              </Message>
              <Form.Field width={16}>
                <label>Message</label>
                <TextArea placeholder='Enter your request or enquiry' value={message} required name="message" rows={4} onChange={this.handleChange}></TextArea>
              </Form.Field>
              <Button type='submit' floated="right" className={'primary-sub'} onClick={this.sendMessage}>Send</Button>
            </Form>
          </div>

        </Grid.Column>

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

          <Loader loading={loading} message={"Sending message"} />
        }
      </Grid>
    )
  }
}

export default Contact