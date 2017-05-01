import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Container, Button} from 'reactstrap';

class PaymentOption extends Component {
  state = {
    selectedPayment: null,
  };

  componentWillMount() {
    document.getElementById('body').className = 'pay';
  }

  componentWillUnmount() {
    document.getElementById('body').className = '';
  }

  render() {
    console.log(this.state);
    return (
      <div className="payment">
        <Container>
          <h2>Veldu greiðsluleið</h2>
          <div className="payment_option">
            <div
              onClick={() => this.setState({selectedPayment: 'kass_selected'})}
              className={
                this.state.selectedPayment === 'kass_selected'
                  ? 'payment_option_bg kass_bg kass_selected'
                  : 'payment_option_bg kass_bg'
              }
            >
              <img src={process.env.PUBLIC_URL + '/img/kass.svg'} alt="Kass" />
              <img src={process.env.PUBLIC_URL + '/img/kass2.svg'} alt="Kass" />
            </div>
            <div className="payment_option_bg">
              <span>Kreditkort</span>
            </div>
          </div>
        </Container>
        <div className="payment_shape">
          <div className="payment_shape_inner">
            <Link to="payment/submit">
              <Button
                className="main-btn"
                disabled={!this.state.selectedPayment}
                color="success"
                size="md"
              >
                Næsta <span>skref</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentOption;
