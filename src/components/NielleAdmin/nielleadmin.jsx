import React, {Component} from 'react'
import { Grid, Container, Button } from 'semantic-ui-react'
import './nielleadmin.scss'
import firebase from '../../firebase'

class NielleAdmin extends Component {

  componentDidMount () {
    const { setActive } = this.props

    setActive('nielle-admin')
  }

  updateMailchimp = () => {
    const { userInfo } = this.props
    var mailchimp = firebase.functions().httpsCallable('mailchimp');
    const data = {
      userInfo: userInfo,
      ticket: "meme"
    }

    return mailchimp(data).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  render () {
    const { mobile } = this.props

    return (
      <Grid stackable className={'section nielleadmin-container'} style={{minHeight: '100vh'}}>
        <Grid.Column width={16}>
          <Container className={"nielleadmin-body"}>
            <Button onClick={this.updateMailchimp}>
              Update me
            </Button>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

export default NielleAdmin