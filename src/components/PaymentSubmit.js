import React, {Component} from 'react';
import axios from 'axios';
import userRefFor from './userRef';
import {Container, FormGroup, Input, Button} from 'reactstrap';

const ROOT_AUTH_URL =
  'https://us-central1-one-time-password-c0c13.cloudfunctions.net'

class PaymentSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.user.uid,
      totalPrice: 0,
      status: null,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    document.getElementById('body').className = 'pay';
    this.userRef = userRefFor(this.props.user);
    this.userRef.on('value', snapshot => {
      const obj = snapshot.val()
      console.log(obj.totalPrice);
      this.setState({ totalPrice: obj.totalPrice })
    })
  }

  componentWillUnmount() {
    document.getElementById('body').className = '';
    this.userRef.off()
  }

  handleChange(e) {
    this.setState({phone: e.target.value});
  }

  handleSubmit(e) {
    this.setState({ loading: true })
    e.preventDefault();
    axios.post(`http://localhost:3001`, {
      phone: this.state.phone,
      totalPrice: this.state.totalPrice
    })
    .then((res) => {
      console.log(res)
      this.setState({ status: res.data, loading: false })
    })
    console.log('state is ' + this.state.phone);
  }

  render() {
    console.log(this.state);
    return (
      <div className="payment payment_submit">
        {this.state.status === null &&
          <Container>
            <FormGroup>
            <Input
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </FormGroup>
        </Container>}

        {this.state.loading &&
          <div className="payment_loading">
          <p>Reikningurinn var sendur á númerið. Kíktu í Kass-appið til að borga.</p>
        </div>}

        {this.state.status &&
        <div className="payment_status">
          {this.state.status === 'Greiðsla staðfest' ?
          <div className="payment_status_success">
            <div>
              {this.state.status}
            </div>
            <p>Greiðsla staðfest! Takk fyrir að koma. Hlökkum til að fá þig aftur.</p>
          </div> :
          <div className="payment_status_error">
            <div>
              {this.state.status}
            </div>
            <p>Greiðslu hafnað. Villuskilaboð koma hér</p>
          </div>}

        </div>}

        <div className="payment_shape">
          <div className="payment_shape_inner">
            <Button
              onClick={this.handleSubmit}
              type="submit"
              className="main-btn"
              // disabled={!this.state.selectedPayment}
              color="success"
              size="md"
            >
              Senda <span>rukkun</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentSubmit;
