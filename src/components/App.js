import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import Home from './Home';
import About from './About';
// import Topics from './Topics';
import FoodIndex from './food_index';
import SinglePost from './single_post';
import Auth from './Auth';

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
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Auth}/>
          <Route exact path="/matur" component={FoodIndex}/>
          <Route path="/matur/:id" component={SinglePost}/>
          <Route path="/about" component={About}/>
          {/* <Route path="/topics" component={Topics}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
