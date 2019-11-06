import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
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
import Aux from './hoc/Aux'
import Login from './components/Login/login'

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
    loggedIn: null,
    db: {}
  }

  componentDidMount () {
    const body = document.querySelector('body').clientWidth
    window.addEventListener("resize", this.updateValue)
    const url = window.location.href
    const db = firebase.firestore()
    this.setState({
      db
    })

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

    if (localStorage.hasOwnProperty('nielleUser')) {
      const { user, userID, userInfo, loggedIn, displayName } = JSON.parse(localStorage.getItem('nielleUser'))

      this.setState({ user, userID, userInfo, loggedIn, displayName })
    }

    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser) {
        this.setState({
          user: FBUser,
          userID: FBUser.uid,
          displayName: FBUser.displayName,
          loggedIn: true
        }, () => {
          this.setLocalStorage()
        })
      }
    })
  }

  getUserInfo = () => {
    const { db, userID } = this.state
    db.collection("userInfo").doc(userID).get().then((snapshot) => {
      var userInfo = snapshot.data();
      console.log(snapshot)
      this.setState({
        userInfo: userInfo,
        snapshot
      }, () => {
        this.setLocalStorage()
      })
    });
  }

  setLocalStorage = () => {
    const { user, userID, userInfo, displayName } = this.state

    localStorage.setItem('nielleUser', JSON.stringify({
      user: user,
      userID: userID,
      userInfo: userInfo,
      loggedIn: true,
      displayName: displayName
    }))
  }

  removeLocalStorage = () => {
    delete localStorage.nielleUser
  }

  removeLoggedIn = () => {
    this.setState({ loggedIn: null })
  }

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      user: null,
      userID: null,
      displayName: null,
      userInfo: null
    }, () => {
      this.removeLocalStorage()
    })

    firebase.auth().signOut().then(() => {
      this.setState({ 
        loggedIn: false
      }, () => {
        this.removeLoggedIn()
      })
    })
  }

  changeActiveState = (e, { id, className }) => {
    this.setState({ activeitem: id }, () => {
      console.log(className)
      className.includes('mobile-menu') && this.handleSidebar()
    })
  }

  updateValue = () => {
    const body = document.querySelector('body').clientWidth
    const mobile = body <= 768 ? true : false
    this.setState({
      mobile: mobile
    })
  }

  handleSidebar = () => this.setState(prevState => ({ visible: !prevState.visible, navVisible: !prevState.navVisible }))

  registerUser = (userInfo, redirectfunc) => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: "false"
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
          loggedIn: true,
          userInfo: userInfo
        }, () => {
          this.setLocalStorage()
        })
      })
    })
    redirectfunc()
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
    const { navItems, mobile, animation, activeitem, dimmed, direction, visible, navVisible, user, userID, userInfo, displayName, loggedIn } = this.state
    console.log(this.state)

    return (
      <div className={'body'}>

        <Router basename={'/'}>

          <Nav navItems={navItems} activeitem={activeitem} mobile={mobile} handleSidebar={this.handleSidebar} changeActiveState={this.changeActiveState} navVisible={navVisible} logOutUser={this.logOutUser} loggedIn={loggedIn} />

          <Sidebar.Pushable as={Segment} style={{margin: '0', border: 'none' }} >
            <VerticalSidebar activeitem={activeitem} animation={animation} direction={direction} visible={visible} handleSidebar={this.handleSidebar}  changeActiveState={this.changeActiveState} navItems={navItems} logOutUser={this.logOutUser} loggedIn={loggedIn} />

            <Sidebar.Pusher dimmed={dimmed && visible} onClick={ !visible ? null : this.handleSidebar} >
              <Switch>
                <Route exact path={'/'} render={(props) => <Homepage {...props} user={user} loggedIn={loggedIn} />} />
                
                
                <Route path={'/login'} render={(props) => <Login {...props} user={user} loggedIn={loggedIn} />} />
                <Route path={'/contact'} render={(props) => <Contact {...props} user={user} loggedIn={loggedIn} />} />
                <Route path={'/order'} render={(props) => <OrderPage {...props} registerUser={this.registerUser} loggedIn={loggedIn} />} />
                <Route path={'/welcome/:type'} render={(props) => <Welcome {...props} user={user} userInfo={userInfo} userID={userID} displayName={displayName} getUserInfo={this.getUserInfo} logOutUser={this.logOutUser} loggedIn={loggedIn} />} />
                <Route path={'/welcome'} render={(props) => <Welcome {...props} user={user} userInfo={userInfo} userID={userID} displayName={displayName} getUserInfo={this.getUserInfo} loggedIn={loggedIn} logOutUser={this.logOutUser} />} />
                <Route path={'/thankyou/:reference'} render={(props) => <ThankyouPage {...props} updateProfilePaid={this.updateProfilePaid} loggedIn={loggedIn} />} />
                <Route path={'/trackorders'} component={OrdersLoadable} loggedIn={loggedIn} />
                <Route component={ErrorLoadable} loggedIn={loggedIn} />
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
