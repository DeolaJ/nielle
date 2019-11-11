import React, { Component } from 'react'
import Body from './Body/Body'
import { Redirect } from 'react-router-dom'
import Aux from '../../hoc/Aux'

class Homepage extends Component {

  render () {
    const { mobile } = this.props
    const { loggedIn} = this.props

    if (loggedIn === false) {
      return <Redirect to="/" />
    }
    
    return (
      <Aux>

        <Body mobile={mobile}/>

      </Aux>
    )
  }
}

export default Homepage;


