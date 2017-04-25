import React, {Component} from 'react';
import _ from 'lodash';
import userRefFor from './userRef';
// import Spinner from './Spinner';
import MyOrderEmpty from './MyOrderEmpty';
import {Container, Col, Button} from 'reactstrap';

class MyOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      orderData: [],
      orderConfirmed: false,
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
      // console.log(obj);
      this.setState({ orderData: obj, loading: false });
    });
  }

  componentWillUnmount() {
    this.userRef.child('orders/').off();
  }

  confirmOrder() {
    this.userRef.child('confirmed_order/').push(this.state.orderData);
    this.userRef.child('orders/').remove();

    this.setState({ orderConfirmed: true });
  }

  handleClick(e) {
    e.preventDefault();
    this.userRef.child('orders/' + this.key).remove();
  }

  renderOrders() {
    if (this.state.orderData === null && this.state.orderConfirmed === false) {
      return <MyOrderEmpty />;
    }

    if (this.state.orderConfirmed === true) {
      return (
        <div>
          <div>ORDER CONFIRMED</div>
          <div
            onClick={() => {
              this.setState({ orderConfirmed: false })
            }}>
            Loka
          </div>
        </div>

      );
    }

    return _.map(this.state.orderData, (order, key) => {
      this.totalPrice += parseInt(order.price);
      // console.log(order);

      return (
        <Col xs="12" key={key}>
          <div className="pending_order">
            <h2>{order.title}</h2>
            <p>{order.price} kr.</p>
            <Button
              color="danger"
              onClick={() =>
                this.userRef
                  .child('orders/' + key)
                  .remove(() => this.setState({ orderData: this.state.orderData }))}
            >
              Eyða
            </Button>
            <Button color="success">Bæta við</Button>
          </div>
        </Col>
      );
    });
  }

  render() {
    this.totalPrice = 0;
    // console.log(this.state);
    return (
      <div id="my_order">
        <Container>
          {this.renderOrders()}
        </Container>
        {this.state.orderData !== null && !this.state.loading
          && <div className="pending_total_order">
                <h2>Samtals <span>{this.totalPrice} kr.</span></h2>
                <Button color="primary" onClick={this.confirmOrder}>
                  Staðfesta pöntun
                </Button>
              </div>}
      </div>
    );
  }
}

export default MyOrder;
