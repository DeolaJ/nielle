import React, { Component } from 'react'
import './Footer.scss'

class Footer extends Component {

  componentDidMount () {
    const footerYear = document.querySelector('.footer-year')
    const currentYear = new Date().getFullYear()

    footerYear.innerHTML = currentYear
  }

  render () {
    const { activeitem } = this.props

    return (
      <footer className={ activeitem === 'home' ? 'home footer': 'footer'}>
        <div className={'footer-container'}>
            <div className={'copyright'}>
              &copy; Copyright <span className={'footer-year'}></span> Nielle's Backyard Cookout 
            </div>
        </div>
      </footer>
    )
  }
}

export default Footer