import React, {Component} from 'react'
import { Grid, Container, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './welcome.scss'
import Footer from '../Footer/Footer'
import Aux from '../../hoc/Aux'

class Welcome extends Component {

  constructor (props) {
    super (props)
    this.state = {
      userName: null
    }
  }
  
  componentDidMount () {
    var mobile = this.state.mobile;
    if (!mobile) {
      const body = document.querySelector('.welcome-container').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile: mobile
      })
    }

  }

  render () {
    const { user, userID, logOutUser } = this.props

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

                  <Header as="h3">
                    Pay

                    <br/><br/>
                    </Header>
                </Aux>

                :

                <Container>
                  You are not logged in, click <Link to="/login">here</Link> to login
                </Container>

              }

            </Container>
          </Grid.Column>
        </Grid>

        <Footer />
      </Aux>
    )
  }
}

export default Welcome
