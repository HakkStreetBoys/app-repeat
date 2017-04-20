import React, { Component } from 'react';
import _ from 'lodash';
// import firebase from './firebase';
import userRefFor from './userRef';
import Spinner from './Spinner';
import MyOrderEmpty from './MyOrderEmpty';
// import MyOrderInner from './MyOrderInner';
import { Container, Col, Button } from 'reactstrap';
// import DeleteOrder from './DeleteOrder';

class MyOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myOrders: [],
      myOrder: null,
      loading: true,
      fRef: null,
      loading: true
    }

    this.handleClick = this.handleClick.bind(this);



    // this.totalPrice = this.totalPrice.bind(this);

  }


  componentWillMount() {
    this.totalPrice = 0;
    this.key = undefined;
    this.userRef = userRefFor(this.props.user);
    // this.setState({ fRef: userRef });
    this.userRef.child('orders/').on('value', (snapshot) => {
      this.setState({ myOrders: this.state.myOrders.concat(snapshot.val()), loading: false });
    });
  }

  handleClick(e) {
    e.preventDefault();

    this.userRef.child('orders/' + this.key)
    .remove()
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

    return _.map(this.state.myOrders[0], (myOrder, key) => {
      const userRef = this.userRef;
      this.totalPrice += parseInt(myOrder.price);
      this.key = key;
      return (
        <Col xs="12" key={key}>
          <div className="pending_order">
            <li>{myOrder.title}</li>
            <li>{myOrder.price} kr.</li>
          </div>

          <Button color="danger" onClick={this.handleClick}>
          Eyða
          </Button>
        </Col>
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
