import React, {Component} from 'react'
import { Grid, Container, Divider, Header, Segment, Button } from 'semantic-ui-react'
import './about.scss'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
// import Map from './map';
import Aux from '../../../../hoc/Aux'

class About extends Component {

  render () {
    const { mobile } = this.props

    return (
      <Grid stackable className={'section about-container'} style={{minHeight: '100vh'}}>
        <Grid.Column width={16}>
          <div className={'about-content'}>
            <Fade bottom={!mobile && true} cascade={!mobile && true}>
              <Segment className={'about-body'}>
                <Grid stackable>
                  <Grid.Row stretched columns={mobile ? 1: 2}>
                    <Grid.Column width={8}>
                      Image
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
                  </Grid.Row>
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

            <Fade bottom={!mobile && true} cascade={!mobile && true}>
              <Segment className={'location-body'}>
                <Grid stackable>
                  <Grid.Row columns={mobile ? 1: 2}>
                    <Grid.Column width={6} className={'location-content_body'}>
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
                        Venue: 49, Abiola Crescent off Toyin street Ikeja
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
                    <Grid.Column width={10}>
                      <div className={"map-container"}>
                        {/* <Map /> */}
                        <iframe title="map to venue" src={"map.html"} width="100%" height="100%"></iframe>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Fade>

            <Segment className={'ticket-body'}>
              <Container>
                <Grid stackable>
                  <Grid.Row stretched columns={mobile ? 1: 2}>
                    <Grid.Column width={8} className={'ticket-content_body'}>
                      <Header as='h2'>
                        Anticipate a fun and learning experience
                      </Header>
                    </Grid.Column>

                    <Grid.Column width={8}>
                      <Link to="/order">
                        <Button size="large" className={"primary-main"}>Register as attendee</Button>
                      </Link> 
                      <br/>
                      <Button size="large" className={"primary-sub"}>Register as Vendor</Button>
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