import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';

const ROOT_AUTH_URL = 'https://us-central1-one-time-password-c0c13.cloudfunctions.net';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      fireRedirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ phone: event.target.value });
    SignUpForm.phone = event.target.value;
    console.log(this.state.phone);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.phone)
    // arrow function til að sleppa við .bind(this)
    axios.post(`${ROOT_AUTH_URL}/createUser`, {
      phone: this.state.phone
    })
      .then(() => {
        axios.post(`${ROOT_AUTH_URL}/requestOneTimePassword`, {
          phone: this.state.phone
        });
      })
      .then(() => {
        this.setState({ fireRedirect: true });
        // const { from } = this.props.location.state || '/';
        const { fireRedirect } = this.state;
        fireRedirect && (
          <Redirect to={'/code'}/>
        )
      })
  }

  render() {

    const { fireRedirect } = this.state;

    return (
      <div className="sign_up">
        <h1>Repeat</h1>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Input
                  type="number"
                  placeholder="Símanúmer"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
            </FormGroup>

            {/* <Link to="/code"> */}
              <Button type="submit" color="info">
                <li>Senda kóða</li>
                <li><img src={process.env.PUBLIC_URL + "/img/form_arrow.svg"} alt="" /></li>
              </Button>
            {/* </Link> */}
            {fireRedirect && (
              <Redirect to={'/login/code'} phone={this.state.phone}/>
            )}
          </Form>
        </Container>
      </div>

    );
  }
}

export default SignUpForm;
