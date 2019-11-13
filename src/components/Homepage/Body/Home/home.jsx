import React, {Component} from 'react'
import { Grid, Header, Container, List, Button } from 'semantic-ui-react'
import './home.scss'
import { Link } from 'react-router-dom'
import homeIcon from '../../../../images/logo-large.png'

class Home extends Component {

  vendorScroll = () => {
    const vendor = document.querySelector(".vendor-body")

    vendor.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  render () {
    const { mobile } = this.props

    return (
      <Grid stackable className={'section home-container'}>

        <div className={'illustration-banner hide-on-mobile'}>
          <div className={'home-illustration'} style={{ backgroundImage: `url(${homeIcon})`}}>
          </div>
        </div>
        <Grid.Column width={16}>
          <Container fluid textAlign={mobile ? 'center' : 'left'} className={'home-content-container'}>
            <Header as='h1' className={'hide-on-mobile'}>
              Nielle's Backyard Cookout 
              <br/>
              &amp; Movie Night
            </Header>

            <Header as='h1' textAlign='center' className={'mobile-only'}>
              Nielle's Backyard Cookout &amp; Movie Night
            </Header>
            <div className={'header-content'}>
              <p className={"venue-info"}>
                Saturday, 7th December 2019
                <br/>
                49, MKO. Abiola Crescent off Toyin street, Lagos
                <br/>
                12pm - 10pm
              </p>
              <p>
                Get ready for an amazing experience with food, drinks, games and friends.
                <br/>
                Contact our team for partnerships or enquiries.
              </p>
            </div>
            <List horizontal>
              <List.Item style={{ marginBottom: "1rem" }}>
                <Link to='/order'>
                  <Button size='large' className={'medium primary-main'}>
                    Purchase Ticket
                  </Button>
                </Link>
              </List.Item>
              <List.Item>
                <Button size='large' onClick={this.vendorScroll} className={'medium primary-main'}>
                  Vendors
                </Button>
              </List.Item>
            </List>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Home