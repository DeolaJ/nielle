import React, { Component } from 'react'
import Body from './Body/Body'
import Aux from '../../hoc/Aux'

class Homepage extends Component {

  state = {
    mobile: null,
  }

  componentDidMount () {
    const body = document.querySelector('body').clientWidth
    window.addEventListener("resize", this.updateValue)

    if (body <= 768 ) {
      this.setState({
        mobile: true
      })
    } else if (body > 768) {
      this.setState({
        mobile: false
      })
    }
  }

  updateValue = () => {
    const body = document.querySelector('body').clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateValue)
  }

  render () {
    const { mobile } = this.state
    
    return (
      <Aux>

        <Body mobile={mobile}/>

      </Aux>
    )
  }
}

export default Homepage;


