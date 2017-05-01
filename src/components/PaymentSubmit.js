import React, { Component } from 'react'
import { Container, FormGroup, Input, Button } from 'reactstrap'

class PaymentSubmit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      phone: this.props.user.uid
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    document.getElementById('body').className = 'pay';
  }

  componentWillUnmount() {
    // document.getElementById('body').className = '';
  }

  handleChange(e) {
    this.setState({phone: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('state is ' + this.state.phone);
  }

  render() {
    return (
      <div className="payment payment_submit">
        <Container>
          <FormGroup>
            <Input
              type='number'
              pattern='[0-9]*'
              inputMode='numeric'
              value={this.state.phone}
              onChange={this.handleChange}

            />
          </FormGroup>
        </Container>

        <div className="payment_shape">
          <div className="payment_shape_inner">
              <Button
                onClick={this.handleSubmit}
                type='submit'
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
    )
  }
}

export default PaymentSubmit
