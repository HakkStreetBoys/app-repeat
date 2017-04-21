import React, {Component} from 'react';
import _ from 'lodash';
import userRefFor from './userRef';
import Spinner from './Spinner';
import MyOrderEmpty from './MyOrderEmpty';
import {Container, Col, Button} from 'reactstrap';

class MyOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderData: [],
    };

    this.totalPrice = 0;
    this.handleClick = this.handleClick.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
  }

  componentWillMount() {
    this.key = undefined;
    this.userRef = userRefFor(this.props.user);
    this.userRef.child('orders/').on('value', snapshot => {
      var obj = snapshot.val();
      console.log(obj);
      this.setState({ orderData: obj });
    });
  }

  componentWillUnmount() {
    this.userRef.child('orders/').off();
  }

  confirmOrder() {
    this.userRef.child('confirmed_order/').set(this.state.orderData);
    this.userRef.child('orders/').remove();
  }

  handleClick(e) {
    e.preventDefault();
    this.userRef.child('orders/' + this.key).remove();
  }

  renderOrders() {
    if (this.state.orderData === null) {
      return <MyOrderEmpty />;
    }

    return _.map(this.state.orderData, (order, key) => {
      this.totalPrice += parseInt(order.price);
      console.log(order);
      console.log(key);
      return (
        <Col xs="12" key={key}>
          <div className="pending_order">
            <li>{order.title}</li>
            <li>{order.price} kr.</li>
          </div>

          <Button
            color="danger"
            onClick={() =>
              this.userRef
                .child('orders/' + key)
                .remove(() => this.setState({ orderData: this.state.orderData }))}
          >
            Eyða
          </Button>
        </Col>
      );
    });
  }

  render() {
    console.log(this.state);
    return (
      <Container id="my_order">
        {this.renderOrders()}
        {this.state.orderData !== null
          ? <div>
              {this.totalPrice}
              <Button color="info" onClick={this.confirmOrder}>
                Confirm Order
              </Button>
            </div>
          : <span />}

      </Container>
    );
  }
}

export default MyOrder;
