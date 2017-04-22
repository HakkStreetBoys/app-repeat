import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Spinner from './Spinner';
import firebase from './firebase';
import Home from './Home';
import FoodIndex from './food_index';
import DrinkIndex from './drink_index';
import SinglePost from './single_post';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import MyOrder from './MyOrder';
import NotFound from './404';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Navigation from './Navigation';
import {
  Navbar,
  Nav,
  NavItem,
  Collapse,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user: undefined,
      isOpen: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      setTimeout(() => {
        this.setState({user});
      }, 2000)
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuthStateChanged();
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({isOpen: false});
      })
      .catch(error => {
        console.log(error);
      });
  }

  presentation = props => {
    const {user} = this.state;
    return (
      <Router>
        <div>
          {user &&
            <div>
              <Navbar color="faded" light toggleable>
                <NavbarBrand>
                  <h2 className="logo">Repeat</h2>
                </NavbarBrand>
                <NavbarToggler right onClick={this.toggle} />
                {this.state.isOpen
                  ? <div className="popup">
                      <Nav>
                        <NavItem onClick={this.logOut.bind(this)}>
                          Logout
                        </NavItem>
                      </Nav>
                    </div>
                  : <div></div>}
              </Navbar>
            </div>}
          {user && <Navigation user={user} />}

          {user !== undefined
            ? <div>
                <Switch>
                  <Route
                    exact
                    path="/"
                    user={user}
                    render={() => {
                      return <Redirect to="/matur" />;
                    }}
                  />

                  <Route
                    exact
                    path="/login"
                    render={() => {
                      if (user) {
                        return <Redirect to="/matur" />;
                      } else {
                        return <SignUpForm />;
                      }
                    }}
                  />
                  <PublicRoute
                    path="/login/code"
                    component={SignInForm}
                    user={user}
                  />
                  <PrivateRoute
                    exact
                    path="/matur"
                    component={FoodIndex}
                    user={user}
                  />
                  <PrivateRoute
                    exact
                    path="/drykkir"
                    component={DrinkIndex}
                    user={user}
                  />
                  <PrivateRoute
                    path="/matur/:id"
                    component={SinglePost}
                    user={user}
                  />
                  <PrivateRoute
                    path="/myorder"
                    component={MyOrder}
                    user={user}
                  />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            : <Spinner />}
        </div>
      </Router>
    );
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {this.presentation()}
      </div>
    );
  }
}

export default App;
