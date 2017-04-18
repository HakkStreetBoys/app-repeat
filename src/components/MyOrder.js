import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import firebase from './firebase';
import userRefFor from './userRef';
import Spinner from './Spinner';
import MyOrderEmpty from './MyOrderEmpty';
import { Button, Container, Row, Col } from 'reactstrap';
// import DeleteOrder from './DeleteOrder';

class MyOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myOrders: [],
      myOrder: null,
      loading: true,
      fRef: null
    }

    this.handleClick = this.handleClick.bind(this);
  }


  componentWillMount() {
    const { adversityId } = this.props.match.params;
    const userRef = userRefFor(this.props.user);
    this.setState({ fRef: userRef });
    userRef.child('orders/').on('value', (snapshot) => {
      // snapshot.forEach(function(orderSnapshot) {
        // console.log(orderSnapshot.val());
        this.setState({ myOrders: this.state.myOrders.concat(snapshot.val()), loading: false });
      // })
    });
  }

  handleClick(e) {
    e.preventDefault();
  }

  renderOrder() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    }

    if (this.state.myOrders[0] === null) {
      return <MyOrderEmpty />
    }

    return _.map(this.state.myOrders[0], (myOrder, key) => {
      return (
        <Col xs="12" key={key}>
          <div className="pending_order">
            <li>{myOrder.title}</li>
            <li>{myOrder.price} kr.</li>
          </div>

          <Button color="danger" onClick={() => {
              // this.setState({ myOrder: myOrder, loading: true });
              this.state.fRef.child('orders/' + key)
              .remove()
              // .then(() => {
              //   this.setState({ myOrder: null, loading: false });
              //   {this.handleClick}
              // })
            }}>
          Eyða
          </Button>
        </Col>
      );
    });
  }

  render() {
    console.log(this.state);
    // const { state } = this;

    return (
      <Container id="my_order">
          <h1>My Order</h1>
          {this.renderOrder()}
      </Container>

    );
  }

}

export default MyOrder;
