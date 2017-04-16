import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import Spinner from './Spinner';
// import '../App.css';
import Home from './Home';
import About from './About';
// import Topics from './Topics';
import FoodIndex from './food_index';
import SinglePost from './single_post';
import Auth from './Auth';
import MyOrder from './MyOrder';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navigation';

class App extends Component {

  state = {
    user: undefined
  }

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyBqxVu2HGo992cGCb0UUPbl4cvh_FVFgbo",
      authDomain: "one-time-password-c0c13.firebaseapp.com",
      databaseURL: "https://one-time-password-c0c13.firebaseio.com",
      projectId: "one-time-password-c0c13",
      storageBucket: "one-time-password-c0c13.appspot.com",
      messagingSenderId: "224931022962"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    })
  }

  render() {
    console.log(this.state);

    const { user } = this.state;

    return (
      user === undefined ?
        <Spinner /> :
      <Router>
        <div>
          <Navigation user={user} />
          <Route exact path="/" component={Home}/>
          <Route path="/login" render={() => {
            if (user) {
              return <Redirect to="/matur" />;
            } else {
              return <Auth />
            }
          }} />
          <PrivateRoute exact path="/matur" component={FoodIndex} user={user} />
          <PrivateRoute path="/matur/:id" component={SinglePost} user={user} />
          <PrivateRoute path="/myorder/:uid" component={MyOrder} user={user} />
          <Route path="/about" component={About}/>
          {/* <Route path="/topics" component={Topics}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
