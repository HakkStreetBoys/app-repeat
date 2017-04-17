import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'firebase';
import userRefFor from './userRef';
import Spinner from './Spinner';

class MyOrder extends Component {
  state = {
    myOrders: [],
    loading: true,
  }

  componentWillMount() {
    const { adversityId } = this.props.match.params;
    const userRef = userRefFor(this.props.user);

    userRef.child('orders').once('value').then((snapshot) => {
      console.log(snapshot.val());
      this.setState({ myOrders: snapshot.val(), loading: false })
      console.log(this.state);
    });

    // console.log(this.props.match.params);
  }

  renderOrder = () => {
    if(this.state.loading === true) {
      return (
        <Spinner />
      )
    }

    return _.map(this.state.myOrders, (myOrder, key) => {
      return <li key={key}>{myOrder}</li>
    });
  }

  render() {
    // const { state } = this;

    return (
      <div>
        <h1>My Order</h1>
        <ul>
          {this.renderOrder()}
        </ul>
      </div>

    );
  }

}

export default MyOrder;
