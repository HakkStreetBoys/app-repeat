import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

class Auth extends Component {
  render() {
    return (
      <div>
        <SignUpForm />
        <SignInForm />
      </div>
    );
  }
}

export default Auth;
