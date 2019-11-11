import React, { Component } from 'react'
import { Icon, Sidebar, Menu, Button } from 'semantic-ui-react'
import './Sidebar.scss'
import { Link } from 'react-router-dom'
import logo from "../../images/logomedium.png"
import Aux from '../../hoc/Aux'

class VerticalSidebar extends Component {

  render () {

    const { animation, direction, visible, navItems, handleSidebar, changeActiveState, activeitem, loggedIn, logOutUser} = this.props 

    return (
      <Sidebar
        as={Menu}
        animation={animation}
        direction={direction}
        icon='labeled'
        inverted
        vertical
        visible={visible}
        width='thin'
        style={{ zIndex: '4'}}
        className={'sidebar-menu'}
      > 
          <Menu.Item>
            <img src={logo} alt="logo" />
          </Menu.Item>
          {
            navItems.map(item => (
              <Menu.Item key={item.id} as={Link} id={item.id} to={item.link} className={'mobile-menu'} active={activeitem === item.id}
                onClick={changeActiveState}>
                {item.name}
              </Menu.Item>
            ))
          }
          {
            loggedIn &&
            <Menu.Item as={Link} to='/welcome' id={'dashboard'} onClick={changeActiveState} className={'mobile-menu'} active={activeitem === 'dashboard'}>
              Dashboard
            </Menu.Item>
          }

          {
            loggedIn ?

            <Menu.Item as='div'>
              <Button className={'primary-main mobile-menu'} onClick={logOutUser}>Logout</Button>
            </Menu.Item>

            :

            <Aux>
              <Menu.Item as='div'>
                <Link to='/order'>
                  <Button className={'primary-main mobile-menu'} id={"order"} active={activeitem === 'order'} onClick={changeActiveState}>
                    Register for event
                  </Button>
                </Link>
              </Menu.Item>

              <Menu.Item as='div' active={activeitem === 'login'}>
                <Link to='/login'>
                  <Button className={'primary-main mobile-menu'} id={'login'} onClick={changeActiveState} active={activeitem === 'login'}>Login</Button>
                </Link>
              </Menu.Item>
            </Aux>
          }

          <Menu.Item as='a' onClick={handleSidebar}> 
            Back
            <Icon name='chevron right' />
          </Menu.Item>
      
      </Sidebar>
    )
  }
}



export default VerticalSidebar