import React, {Component} from 'react'
import { Grid, Button, List, Container, Header } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import './errorpage.scss'
import errorIcon from '../../images/logo-mid.png'

class ErrorPage extends Component {

  render () {
    const { loggedIn } = this.props
    if (loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <Grid className={'errorpage-container'}>
        <Grid.Column width={16}>
          <Container textAlign="center">
            
            <Header as='h1'>
              Oops, Lets take you home
            </Header>

            <div className={'error-image'}>
              <img src={errorIcon} alt='404 page illustration' />
            </div>

            <div>
              <List horizontal>
                <List.Item>
                  <Link to='/'>
                    <Button className={'primary-sub'}>
                      Home
                    </Button>
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to='/order'>
                    <Button className={'primary-main order-button'}>
                      Purchase Ticket
                    </Button>
                  </Link>
                </List.Item>
              </List>
            </div>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ErrorPage
