import React, {Component} from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './moviepoll.scss'

class MoviePoll extends Component {

  componentDidMount () {
    const { setActive } = this.props

    setActive('moviepoll')
  }

  render () {
    const { mobile, loggedIn } = this.props

    return (
      <Grid stackable className={'section moviepoll-container'} style={{minHeight: '100vh'}}>
        <Grid.Column width={16}>
          <Container className={"moviepoll-body"}>
            <iframe title="movie poll" src="https://docs.google.com/forms/d/e/1FAIpQLSeOCN98aHXEtvCGR540LhB9KW9oKoMnKOY9dfD9VDKYeo8VKA/viewform?embedded=true" width="700" 
              height="520" frameBorder="0" marginHeight="0" marginWidth="0">
              Loading...
            </iframe>
          </Container>
          <br/>

          {
            !loggedIn &&

            <Container textAlign="center">
              <Header as="h2" style={{ color: 'white' }}>
                If you haven't registered to attend this event, you can register <Link to="/order">here</Link>
              </Header>
              <br/>
            </Container>
          }
        </Grid.Column>
      </Grid>
    )
  }
}

export default MoviePoll