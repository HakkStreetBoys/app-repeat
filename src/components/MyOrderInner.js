import React from 'react';
import { Button, Col } from 'reactstrap';

const MyOrderInner = (props) => {
  return (
    <Col xs="12">
      <h1>hallo</h1>
      <div className="pending_order">
        <li>{props.myOrder.title}</li>
        <li>{props.myOrder.price} kr.</li>
      </div>

      <Button color="danger" onClick={() => {
          // this.setState({ myOrder: myOrder, loading: true });
          props.fRef.child('orders/' + props.orderKey)
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
}

export default MyOrderInner;
