import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter as Router, HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Sidebar, Segment } from "semantic-ui-react"
import Loadable from 'react-loadable';
import Loader from './components/Loader/loader'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import VerticalSidebar from './components/Sidebar/VerticalSidebar'
import Homepage from './components/Homepage/homepage'
import Contact from './components/Contact/contact'
import OrderPage from './components/OrderPage/orderpage'
import Welcome from './components/Welcome/welcome'
import firebase from 'firebase'
import ThankyouPage from './components/ThankyouPage/thankyoupage'

// const HomepageLoadable = Loadable({
//   loader: () => import('./components/Homepage/homepage'),
//   loading() {
//     return <Loader message={""} loading={true} />
//   }
// });

// const ContactLoadable = Loadable({
//   loader: () => import('./components/Contact/contact'),
//   loading() {
//     return <Loader message={""} loading={true} />
//   }
// });

// const OrderLoadable = Loadable({
//   loader: () => import('./components/Orderpage/orderpage'),
//   loading() {
//     return <Loader message={""} loading={true} />
//   }
// });

const OrdersLoadable = Loadable({
  loader: () => import('./components/Orders/orders'),
  loading() {
    return <Loader message={""} loading={true} />
  }
});

const ThankyouLoadable = Loadable({
  loader: () => import('./components/ThankyouPage/thankyoupage'),
  loading() {
    return <Loader message={""} loading={true} />
  }
});

const ErrorLoadable = Loadable({
  loader: () => import('./components/ErrorPage/errorpage'),
  loading() {
    return <Loader message={""} loading={true} />
  }
});

class App extends Component {
  state = {
    navItems: [
      {
        id: 'home',
        name: 'Home',
        link: '/'
      },
      {
        id: 'contact',
        name: 'Contact',
        link: '/contact'
      }
    ],
    mobile: null,
    animation: 'uncover',
    direction: 'left',
    dimmed: true,
    visible: false,
    navVisible: true,
    activeitem: "",
    user: null,
    userID: null,
    displayName: null,
    userInfo: null,
    db: {},
  }

  componentDidMount () {
    const body = document.querySelector('body').clientWidth
    window.addEventListener("resize", this.updateValue)
    const url = window.location.href
    const db = firebase.firestore()

    this.setState(url.includes("contact") ? { activeitem: "contact"} : (url.includes("payment") ? { activeitem: "contact"} : { activeitem: "home"}))

    if (body <= 768 ) {
      this.setState({
        mobile: true
      })
    } else if (body > 768) {
      this.setState({
        mobile: false
      })
    }

    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser) {
        this.setState({
          user: FBUser,
          userID: FBUser.uid,
          displayName: FBUser.displayName
        }, () => {
          db.collection(`userInfo/${FBUser.uid}`).get().then((snapshot) => {
            var userInfo = snapshot.data();
            this.setState({
              userInfo: userInfo
            })
          });
        })
      }
    })
  }

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      user: null,
      userID: null
    })
    firebase.auth().signOut().then(() => {
      return <Redirect to="/welcome" />
    })
  }

  changeActiveState = (e, { id }) => {
    this.setState({ activeitem: id })
  }

  updateValue = () => {
    const body = document.querySelector('body').clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
  }

  handleSidebar = () =>
  this.setState(prevState => ({ visible: !prevState.visible, navVisible: !prevState.navVisible }))

  registerUser = (userInfo) => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: "false"
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
          userInfo: userInfo
        }, () => {
          return <Redirect to="/welcome/newuser" />
        })
      })
    })
  }

  updateProfilePaid = () => {
    firebase.auth().updateCurrentUser(FBUser => {
      FBUser.updateProfile({
        displayName: "true"
      }).then(() => {
        this.setState({
          displayName: FBUser.displayName
        })
      })
    })
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.updateValue)
  }
 
  render () {
    const { navItems, mobile, animation, activeitem, dimmed, direction, visible, navVisible, user, userID, userInfo, displayName } = this.state
    
    return (
      <div className={'body'}>

        <Router basename={'/'}>

          <Nav navItems={navItems} activeitem={activeitem} mobile={mobile} handleSidebar={this.handleSidebar} changeActiveState={this.changeActiveState} navVisible={navVisible} />

          <Sidebar.Pushable as={Segment} style={{margin: '0', border: 'none' }} >
            <VerticalSidebar activeitem={activeitem} animation={animation} direction={direction} visible={visible} handleSidebar={this.handleSidebar}  changeActiveState={this.changeActiveState} navItems={navItems} />

            <Sidebar.Pusher dimmed={dimmed && visible} onClick={ !visible ? null : this.handleSidebar} >
              <Switch>
                <Homepage exact path={'/'} user={user} />
                <Welcome path={'/welcome/:type'} user={user} userInfo={userInfo} userID={userID} displayName={displayName} />
                <Contact path={'/contact'} user={user} />
                {/* Order stands for payment now */}
                <OrderPage path={'/order'} user={user} registerUser={this.registerUser} /> 
                <Route path={'/trackorders'} component={OrdersLoadable} />
                <ThankyouPage path={'/thankyou/:reference'} updateProfilePaid={this.updateProfilePaid} />
                <Route component={ErrorLoadable} />
              </Switch>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          
          <Footer/>
        </Router>

      </div>
    )
  }
}

export default App;
