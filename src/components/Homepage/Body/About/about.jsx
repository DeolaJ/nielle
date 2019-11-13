import React, {Component} from 'react'
import { Grid, Container, Divider, Header, Segment, Button } from 'semantic-ui-react'
import './about.scss'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import ntel from '../../../../images/ntel-small.png'
import flutterwave from '../../../../images/FLW-small.svg'
import piggyvest from '../../../../images/piggy-small.png'
import fla from '../../../../images/fla-small.png'
import roq from '../../../../images/roq-small.png'
import food from '../../../../docs/food.pdf'
import nonfood from '../../../../docs/nonfood.pdf'
import people from '../../../../images/people.jpg'

class About extends Component {

  render () {
    const { mobile } = this.props

    return (
      <Grid stackable className={'section about-container'} style={{minHeight: '100vh'}}>
        <Grid.Column width={16}>
          <div className={'about-content'}>

            <Grid className={"partners-section"}>
              <Header as="h2" textAlign="center">Event Partners</Header>
              <Grid.Row stretched columns={mobile ? 2 : 5}>
                <Grid.Column verticalAlign="middle">
                  <img src={ntel} alt="ntel logo" />
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <img src={flutterwave} alt="flutterwave logo" />
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <img src={piggyvest} alt="piggyvest logo" />
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <img src={fla} alt="financial literate africa logo" />
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <img src={roq} alt="rowables logo" />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider />

            <Fade bottom={!mobile && true} cascade={!mobile && true}>
              <Segment className={'about-body'}>
                <Grid stackable>
                  <Grid.Column width={8} verticalAlign="middle">
                    <img src={people} alt="Last year's event" />
                  </Grid.Column>
                  <Grid.Column width={8} className={'about-content_body'}>
                    <Header className={'section-title'} as='h2'>
                      About Us
                      <Header.Subheader>Brief Insight</Header.Subheader>
                    </Header>

                      <p><strong>Nielle’s Backyard Cookout and Movie Night</strong> was formed out of our love for food and bringing people together.</p>
                    
                      <p>Our vision was further motivated by the lack of events of this nature on the mainland. The event’s aim is to create an atmosphere where young people from all backgrounds can <strong>network, shop, reconnect and get enlightened</strong></p>
                    
                      <p>We also aim to promote local businesses, as well as create a vibrant and engaging community atmosphere for people</p>
                    
                      <p>There are four elements to the event; <strong>Music, Food, Film and Conversations</strong>. Every element is carefully planned to the last detail to ensure attendees are guaranteed an amazing experience</p>
                    
                  </Grid.Column>
                </Grid>
              </Segment>
            </Fade>

            <Divider />

            <Fade left={!mobile && true} cascade={!mobile && true}>
              <Segment className={'this-year-body'}>
                <Grid stackable>
                  <Grid.Column width={16}>
                    <Header className={'section-title'} as='h3'>
                      This Year's Event
                    </Header>

                      <p>
                        This year’s theme, ‘Millinielles‘ is a nod to Generation Z and is inﬂuenced by 
                        the 1990’s-2000’s in which they were created. Music, Movies and Activities will 
                        be carefully designed to ﬁt this theme with a combination of African–American 
                        and Nigerian culture infusion.
                      </p>

                      <p>
                        This year we intend to explore the conversation section 
                        more by putting a topic to it. The top of conversation is{" "}
                        <strong>‘How to rule your finances’</strong>
                      </p>

                      <p>
                        We believe everyone should have some level of financial literacy.
                        There will also be other side attractions such as games, shopping to keep attendees busy.
                      </p>
                    
                  </Grid.Column>
                </Grid>
              </Segment>
            </Fade>

            <Divider />

            <Segment className={'vendor-body'}>
              <Container textAlign="center">
                  <div>
                  <Header as='h2'>
                    Become a Vendor
                  </Header>
                  <p>
                    We have a special package for vendors courtesy of our Partner, Flutterwave. Read our Vendor Information documents below to get an overview.
                  </p>
                  <a href={food} target="_blank" rel="noopener noreferrer" disabled={mobile ? false : true}>
                    <Button size="large" className={'primary-sub'}>Food Vendor</Button>
                  </a>
                  <br/>
                  <br/>
                  <a href={nonfood} target="_blank" rel="noopener noreferrer" disabled={mobile ? false : true}>
                    <Button size="large" className={'primary-sub'}>Non-Food Vendor</Button>
                  </a>
                  <Header as="h3">
                    Convinced?
                    <Header.Subheader>
                      Fill this <Link to="/vendors">form</Link> to register your details with us, then pay using this <a href={"https://rave.flutterwave.com/pay/vendor-registration"}>link</a>
                    </Header.Subheader>
                  </Header>
                </div>
              </Container>
            </Segment>

            <Divider />

            <Fade bottom={!mobile && true} cascade={!mobile && true}>
              <Segment className={'location-body'}>
                <Grid stackable>
                  <Grid.Row columns={mobile ? 1: 2}>
                    <Grid.Column width={8} className={'location-content_body'}>
                      <Header className={'section-title'} as='h2'>
                        Location
                      </Header>

                      <p>
                        Nielles Backyard Cookout and Movie Night
                      </p>
                      <p>
                        ‘Millinielles’ Edition (90s-2000s era)
                      </p>
                      <p>
                        Date: 7th of December
                      </p>
                      <p>
                        Venue: 49, MKO. Abiola Crescent off Toyin street Ikeja, Lagos
                      </p>
                      <p>
                        Time: 12pm
                      </p>

                      <div className="contact-body">
                        <Header as="h3">
                          Contact Information
                        </Header>
                        <div className="contact-info">
                          <div>
                            <p className="info-head">Phone</p>
                            <p className="info-text">+(234)8129878793</p>
                          </div>
                          <div>
                            <p className="info-head">Email</p>
                            <p className="info-text">niellescreations@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <div className={"map-container"}>
                        {/* <Map /> */}
                        <iframe title="map to venue" src={"map.html"} width="100%" height="100%"></iframe>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Fade>

            <Divider />

            <Segment className={'ticket-body'}>
              <Container>
                <Grid stackable>
                  <Grid.Row stretched columns={mobile ? 1: 2}>
                    <Grid.Column width={8} className={'ticket-content_body'} verticalAlign="middle">
                      <Header as='h2'>
                        Anticipate a fun and learning experience
                      </Header>
                      <p>
                        Attendee Ticket - N1000
                        <br/>
                        Vendor Registration - N10,000
                      </p>
                    </Grid.Column>

                    <Grid.Column className={"register-group-button"} width={8} textAlign="center" verticalAlign="middle">
                      <Link to="/order">
                        <Button size="large" className={"primary-main"}>Purchase Ticket</Button>
                      </Link> 
                      <br/>
                      <Link to="/vendors">
                        <Button size="large" className={"primary-main"}>Register as Vendor</Button>
                      </Link> 
                      <br/>
                      <a href={"https://rave.flutterwave.com/pay/vendor-registration"} rel="noopener noreferer" target={"_blank"}>
                        <Button size="large" className={"primary-sub"}>Pay as Vendor</Button>
                      </a>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
          </div>

        </Grid.Column>
      </Grid>
    )
  }
}

export default About