import React, { Component } from 'react';
import firebase from 'firebase';
import userRefFor from './userRef';

class MyOrder extends Component {
  componentWillMount() {
    const { adversityId } = this.props.match.params;
    const userRef = userRefFor(this.props.user);

    userRef.once('value').then(function(snapshot) {
      console.log(snapshot.val());
      // ...
    });
    // console.log(this.props.match.params);
  }

  // userRef.once('value').then(function(snapshot) {
  //   console.log(snapshot);
  // }

  render() {
    const { state } = this;

    return (
      <h1>My Order</h1>
    );
  }

}

export default MyOrder;
