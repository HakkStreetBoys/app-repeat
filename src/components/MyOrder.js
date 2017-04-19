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

    this.state = {
      myOrders: [],
      myOrder: null,
      loading: true,
      fRef: null,
      totalPrice: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }


  componentWillMount() {
    // const { adversityId } = this.props.match.params;
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

  renderOrder = () => {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    }

    if (this.state.myOrders[0] === null) {
      return <MyOrderEmpty />
    }
    let totalPrice = 0;
    return _.map(this.state.myOrders[0], (myOrder, key) => {
      // this.setState({ totalPrice: myOrder.price[0] });
      // console.log(myOrder);
      totalPrice += parseInt(myOrder.price);
      console.log(totalPrice);
      return (
        <div>
          <MyOrderInner key={key} myOrder={myOrder} orderKey={key} fRef={this.state.fRef} />
          {/* <li>{totalPrice}</li> */}
        </div>
      );
    });

    // return totalPrice;
    // this.setState({ totalPrice });

  }

  render() {
    console.log(this.state);
    // const { state } = this;

    return (
      <Container id="my_order">
          {this.renderOrder()}
      </Container>

    );
  }

}

export default MyOrder;
