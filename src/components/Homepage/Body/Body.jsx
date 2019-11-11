import React, {Component} from 'react'
import './Body.scss'
import { Grid } from 'semantic-ui-react'
import Home from './Home/home'
import About from './About/about'

class Body extends Component {

  render () {
    const { mobile } = this.props

    return (
      <main className={'mainbody'}>
        <Grid stackable>
          <Grid.Column width={16}>
            <section>
              <Home mobile={mobile}/>
            </section>
            <section>
              <About mobile={mobile}/>
            </section>
          </Grid.Column>
        </Grid>
      </main>
    )
  }
}

export default Body