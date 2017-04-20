import React, { Component } from 'react';
import _ from 'lodash';
// import firebase from './firebase';
import userRefFor from './userRef';
import Spinner from './Spinner';
import MyOrderEmpty from './MyOrderEmpty';
import MyOrderInner from './MyOrderInner';
import { Container } from 'reactstrap';
// import DeleteOrder from './DeleteOrder';

class MyOrder extends Component {
  constructor(props) {
    super(props);

    this.totalPrice = 0;

    this.state = {
      myOrders: [],
      myOrder: null,
      loading: true,
      fRef: null,
      loading: true
    }

    this.handleClick = this.handleClick.bind(this);
  }


  componentWillMount() {
    const userRef = userRefFor(this.props.user);
    this.setState({ fRef: userRef });
    userRef.child('orders/').on('value', (snapshot) => {
      this.setState({ myOrders: this.state.myOrders.concat(snapshot.val()), loading: false });
    });
  }

  handleClick(e) {
    e.preventDefault();
  }

  renderOrder = () => {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    }

    if (this.state.myOrders[0] === null) {
      return <MyOrderEmpty />
    }

    const that = this;
    return _.map(this.state.myOrders[0], (myOrder, key) => {
      this.totalPrice += parseInt(myOrder.price);
      return (
        <MyOrderInner key={key} myOrder={myOrder} orderKey={key} fRef={this.state.fRef} totalPrice={this.totalPrice} />
      );
    });
  }

  render() {
    return (
      <Container id="my_order">
          {this.renderOrder()}
          {this.totalPrice}
      </Container>
    );
  }

}

export default MyOrder;
