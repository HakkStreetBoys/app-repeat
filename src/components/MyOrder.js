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

    var component = this;
    userRef.child('orders/').on('value', (snapshot) => {
      // snapshot.forEach(function(orderSnapshot) {
        // console.log(orderSnapshot.val());
        this.setState({ myOrders: this.state.myOrders.concat(snapshot.val()), loading: false });
      // })
    });
  }

  renderOrder = () => {
    if(this.state.loading === true) {
      return (
        <Spinner />
      )
    }

    return _.map(this.state.myOrders[0], (myOrder, key) => {
      return <li key={key}>{myOrder.title}</li>
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
