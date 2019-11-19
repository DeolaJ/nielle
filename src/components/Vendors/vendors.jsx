import React, {Component} from 'react'
import { Grid, Container } from 'semantic-ui-react'
import './vendors.scss'

class Vendors extends Component {

  componentDidMount () {
    const { setActive } = this.props

    setActive('vendors')
  }

  render () {
    const { mobile } = this.props

    return (
      <Grid stackable className={'section vendors-container'} style={{minHeight: '100vh'}}>
        <Grid.Column width={16}>
          <Container className={"vendors-body"}>
            <iframe title="vendor registration form" src="https://docs.google.com/forms/d/e/1FAIpQLSeI-bHX7rpv_W5H1qquL9T7AwDL3V6cYu7ydnt2bmp8kNYqtQ/viewform?embedded=true" width="640" 
              height="1296" frameBorder="0" marginHeight="0" marginWidth="0">
                Loading...
            </iframe>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Vendors