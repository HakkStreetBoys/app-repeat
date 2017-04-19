import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import firebase from 'firebase';
import Spinner from './Spinner';
import firebase from './firebase';
// import '../App.css';
import Home from './Home';
import About from './About';
// import Topics from './Topics';
import FoodIndex from './food_index';
import SinglePost from './single_post';
// import Auth from './Auth';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import MyOrder from './MyOrder';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Navigation from './Navigation';
import { Navbar, Nav, NavItem, Collapse, NavbarBrand, NavbarToggler } from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user: undefined,
      isOpen: false
    };
  }

  componentDidMount() {
    // var config = {
    //   apiKey: "AIzaSyBqxVu2HGo992cGCb0UUPbl4cvh_FVFgbo",
    //   authDomain: "one-time-password-c0c13.firebaseapp.com",
    //   databaseURL: "https://one-time-password-c0c13.firebaseio.com",
    //   projectId: "one-time-password-c0c13",
    //   storageBucket: "one-time-password-c0c13.appspot.com",
    //   messagingSenderId: "224931022962"
    // };
    // firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    })
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({ isOpen: false })
      })
        .catch(error => {
          console.log(error);
        });
  }

  presentation = (props) => {
    const { user } = this.state;
    return (
      <Router>
        <div>
          {user && <div>
            <Navbar color="faded" light toggleable>
              <NavbarBrand>
                <h2 className="logo">Repeat</h2>
              </NavbarBrand>
              <NavbarToggler right onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav>
                  <NavItem onClick={this.logOut.bind(this)}>Logout</NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>}
          {user && <Navigation user={user} />}

          {
            user !== undefined
              ?
                <div>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/login" render={() => {
                      if (user) {
                        return <Redirect to="/matur" />;
                      } else {
                        return <SignUpForm />
                      }
                    }}
                  />
                  <PublicRoute path="/login/code" component={SignInForm} user={user} />
                  <PrivateRoute exact path="/matur" component={FoodIndex} user={user} />
                  <PrivateRoute path="/matur/:id" component={SinglePost} user={user} />
                  <PrivateRoute path="/myorder" component={MyOrder} user={user} />
                  <Route path="/about" component={About}/>
                </div>
              : <Spinner />
          }
        </div>
      </Router>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.presentation()}
      </div>
    )
    // console.log(this.state);

  }
}

export default App;
