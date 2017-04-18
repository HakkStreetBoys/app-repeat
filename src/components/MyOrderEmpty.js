import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'reactstrap';

const MyOrderEmpty = () => {
  return (
    <Col xs="12">
      <div className="pending_order order_empty">
        <div>
          <h2>Pöntunarlisti tómur</h2>
          <img src={process.env.PUBLIC_URL + "/img/order_empty.svg"} />
          <p>Þú virðist ekki hafa bætt neinu við á pöntunarlista</p>
        </div>
      </div>
      <Link to="/matur">
        <Button color="primary">Aftur í matseðil</Button>
      </Link>
    </Col>
  );
};

export default MyOrderEmpty;
