import React, { Component } from 'react'
import { Icon, Sidebar, Menu, Button } from 'semantic-ui-react'
import './Sidebar.scss'
import { Link } from 'react-router-dom'
import logo from "../../images/logomedium.png"

class VerticalSidebar extends Component {

  render () {

    const { animation, direction, visible, handleSidebar, navItems, changeActiveState, activeitem, loggedIn, logOutUser} = this.props 

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
              <Menu.Item key={item.id} as={Link} to={item.link} active={activeitem === item.id}
                onClick={changeActiveState, handleSidebar}>
                {item.name}
              </Menu.Item>
            ))
          }

          <Menu.Item as='div'>
            <Link to='/order'>
              <Button className={'primary-main'} id="order" onClick={changeActiveState, handleSidebar}>
                Get a Ticket
              </Button>
            </Link>
          </Menu.Item>
          {
            loggedIn ?

            <Menu.Item as='div'>
              <Button className={'primary-main'} onClick={logOutUser}>Logout</Button>
            </Menu.Item>

            :

            <Menu.Item as='div'>
              <Link to='/login'>
                <Button className={'primary-main'}>Login</Button>
              </Link>
            </Menu.Item>
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