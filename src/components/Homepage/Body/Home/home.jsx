import React, {Component} from 'react'
import { Grid, Header, Container, List, Button } from 'semantic-ui-react'
import './home.scss'
import Typist from 'react-typist'
import { Link } from 'react-router-dom'
import homeIcon from '../../../../images/colorful.png'

class Home extends Component {

  render () {
    const { mobile } = this.props

    return (
      <Grid stackable className={'section home-container'} style={ mobile ? { backgroundImage: `url(${homeIcon})` } : null }>

        <div className={'illustration-banner hide-on-mobile'}>
          <div className={'home-illustration'} style={{ backgroundImage: `url(${homeIcon})`}}>
          </div>
        </div>
        <Grid.Column width={16}>
          <Container fluid textAlign={mobile ? 'center' : 'left'} className={'home-content-container'}>
            <Header as='h1' className={'hide-on-mobile'}>
              <Typist cursor={{
                show: false,
                blink: true,
                element: '|',
                hideWhenDone: true,
                hideWhenDoneDelay: 1000,
              }} avgTypingDelay={130}>
                Clothing With Style
              </Typist>
            </Header>

            <Header as='h1' textAlign='center' className={'mobile-only'}>
              <Typist cursor={{
                show: false,
                blink: true,
                element: '|',
                hideWhenDone: true,
                hideWhenDoneDelay: 1000,
              }} avgTypingDelay={130}>
                Clothing With Style
              </Typist>
            </Header>
            <div className={'header-content'}>
              <p>
                Get amazing plain tees, sweat pants, hoodies, 
                <br/>
                shorts and caps at amazing prices. 
                <br/>
                Incredible deliveries &amp; return policy.
              </p>
            </div>
            <List horizontal>
              <List.Item>
                <Link to='/order'>
                  <Button size='large' color='blue' className={'primary-main'}>
                    Order now
                  </Button>
                </Link>
              </List.Item>
            </List>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Home