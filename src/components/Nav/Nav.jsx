import React, { Component } from 'react'
import './Nav.scss'
import { Icon, List, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Aux'
import logowhite from '../../images/logowhite.png'
import logowhitesmall from '../../images/logowhitemedium.png'

class Nav extends Component {

  render () {
    const { navItems, mobile, changeActiveState, activeitem, handleSidebar, navVisible, loggedIn, logOutUser } = this.props

    return (
      <nav className={'nav'} style={{ display: navVisible ? 'block' : 'none' }}>

        {
          !mobile ?
          <Aux>
            <div className={'logo'}>
              <img alt='logo icon' className={'logo-icon'} src={logowhite} />
            </div>
            <List horizontal link className={'navLink'}>
              {
                navItems.map((item) => (
                  <List.Item as={Link}
                    key={item.id}
                    id={item.id}
                    to={item.link}
                    onClick={changeActiveState} 
                    active={activeitem === item.id}
                    >
                      {item.name}
                  </List.Item>
                ))
              }
              {
                loggedIn &&
                <List.Item as={Link} to='/welcome' id={'dashboard'} onClick={changeActiveState} active={activeitem === 'dashboard'}>
                  Dashboard
                </List.Item>
              }
              {
                loggedIn ?

                <List.Item>
                  <Button className={'primary-main'} onClick={logOutUser}>Logout</Button>
                </List.Item>

                :

                <Aux>
                  <List.Item>
                    <Link to='/order'>
                      <Button className={'primary-main'} id="order" onClick={changeActiveState}>Register for event</Button>
                    </Link>
                  </List.Item>

                  <List.Item>
                    <Link to='/login'>
                      <Button className={'primary-main'}>Login</Button>
                    </Link>
                  </List.Item>
                </Aux>
              }
            </List>
          </Aux>

          :
          <Grid className={'mobile-navitems'}>
            <Grid.Row columns={3}>

              <Grid.Column textAlign='left'>
                <Icon onClick={handleSidebar} size='big' name='bars'/>
              </Grid.Column>

              <Grid.Column as={Link} to={"/"} textAlign='center' verticalAlign='middle' style={{ position: 'relative', height: '55px', overflow: 'hidden' }}>
                <img alt='logo icon' className={'mobile-logo'} src={logowhitesmall}/>
              </Grid.Column>

              <Grid.Column textAlign='right'>
                <Link to='/order'>
                  <Button className={'primary-main icon'} id="order" onClick={changeActiveState}>
                    Register
                  </Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        }
        
      </nav>
    )
  }
}

export default Nav