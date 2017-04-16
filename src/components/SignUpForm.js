import React, { Component } from 'react';
import axios from 'axios';

const ROOT_AUTH_URL = 'https://us-central1-one-time-password-c0c13.cloudfunctions.net';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { phone: '' }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ phone: event.target.value });
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
  }

  render() {
    return (
      <form>
        <div>
          <label>
            Phone:
            <input
              type="text"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <input
          type="submit"
          value="Submit"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

export default SignUpForm;
