import React, {Component} from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import './thankyoupage.scss'
import Footer from '../Footer/Footer'
import Aux from '../../hoc/Aux'

class ThankyouPage extends Component {

  constructor (props) {
    super (props)
    this.state = {
      mobile: null,
      order: null,
      contact: null
    }
  }
  
  componentDidMount () {
    const { match } = this.props
    const { reference } = match.params
    var mobile = this.state.mobile;
    if (!mobile) {
      const body = document.querySelector('.thankyoupage-container').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile: mobile
      })
    }

    this.setState({
      order: (reference === 'order') ? true : false,
      contact: (reference === 'contact') ? true : false
    })
  }

  render () {
    const { order, contact } = this.state

    return (
      <Aux>
        <Grid className={'thankyoupage-container'}>
          <Grid.Column width={16}>
            <Container textAlign='center' style={{ marginTop: '20%' }}>
              {
                order &&

                <Aux>
                  <Header as="h2">
                    Thank you for filling the form. We will love to hear from you
                  </Header>

                  <Header as="h3">
                    One of our agents will contact you soon to confirm your order

                    <br/><br/>
                    However, if you will like to chat with an agent now, click <a href="https://wa.me/2349057435025" rel="noreferrer noopener" target={"_blank"}>here</a>
                  </Header>
                </Aux>
              }

              {
                contact &&

                <Aux>
                  <Header as="h2">
                    Thank you for filling the form. We will send a response soon
                  </Header>

                  <Header as="h3">
                    However, if you will like to chat with an agent now, click <a href="https://wa.me/2349057435025"  rel="noreferrer noopener" target={"_blank"}>here</a>
                  </Header>
                </Aux>
              }
            </Container>
          </Grid.Column>
        </Grid>

        <Footer />
      </Aux>
    )
  }
}

export default ThankyouPage
