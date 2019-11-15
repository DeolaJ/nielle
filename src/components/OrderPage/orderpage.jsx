import React, { PureComponent } from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import './orderpage.scss'
import CheckoutForm from './form'
import firebase from '../../firebase'
import Aux from '../../hoc/Aux'

class OrderPage extends PureComponent {

  constructor (props) {
    super (props)
    this.state = {
      stageOne: true,
      mobile: null,
      db: {},
    }

    this.onUnload = this.onUnload.bind(this)
  }

  componentDidMount () {
    var mobile = this.state.mobile;
    window.addEventListener("resize", this.updateValue)
    window.addEventListener("beforeunload", this.onUnload)
    var db = firebase.firestore()
    if (!mobile) {
      const body = document.querySelector('body').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile,
        db
      })
    }

    const { setActive } = this.props

    setActive('order')
  }

  updateValue = () => {
    const body = document.querySelector('body').clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
  }
    
  componentWillUnmount () {
    window.removeEventListener("resize", this.updateValue)
    window.removeEventListener("beforeunload", this.onUnload)
  }

  onUnload(event) { // the method that will be used for both add and remove event
      console.log("hellooww")
      event.returnValue = "Hellooww"
  }

  unloadForm = () => {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  render () {

    const {  mobile, db } = this.state
    const { registerUser, loggedIn, registerDone } = this.props

    if (registerDone) {
      return <Redirect to="/welcome/newuser" />
    }

    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <Grid className={'orderpage-container'}>

        <Grid.Column width={16}>

          <Container className={'checkout-form'}>
            {
              loggedIn ? 

              <div>
                <p>
                  Please proceed to your <Link to="/welcome">Dashboard</Link>
                </p>
              </div>

              :

              <Aux>
                  <Header as="h2" className={"section-title"} textAlign="center">
                    Step 1 - Register your details
                  </Header>
                  <br/>
                  <CheckoutForm db={db} mobile={mobile} unloadForm={this.unloadForm} registerUser={registerUser} />
              </Aux>
            }

          </Container>

        </Grid.Column>

      </Grid>
    )
  }
}

export default OrderPage
