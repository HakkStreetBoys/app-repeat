import React, {Component} from 'react';
import axios from 'axios';
import firebase from 'firebase';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';
import SignUpForm from './SignUpForm';

const ROOT_AUTH_URL = 'https://us-central1-one-time-password-c0c13.cloudfunctions.net';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: '',
            error: ''
        }

        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCodeChange(event) {
        this.setState({code: event.target.value});
        console.log(this.state.code);
    }

    handlePhoneChange(event) {
        this.setState({phone: event.target.value});
        console.log(this.state.phone);
    }

    handleSubmit(event) {
        event.preventDefault();
        let response = axios.post(`${ROOT_AUTH_URL}/verifyOneTimePassword`, {
            phone: SignUpForm.phone,
            code: this.state.code
        }).then((response) => {
          console.log(SignUpForm.phone);
          firebase.auth()
          .signInWithCustomToken(response.data.token)
          .catch(error => {
            console.log(error);
          });
          console.log(response.data.token);
        });
        console.log(response);
        // console.log(response.data);

    }

    render() {
      console.log(SignUpForm.phone);
        return (
          <div className="sign_up">
            <Container>
              <img className="login_logo" src={process.env.PUBLIC_URL + "/img/logo.svg"} alt="" />
              <Form>
                <FormGroup>
                    <Input placeholder="Símanúmer" type="hidden" value={SignUpForm.phone} onChange={this.handlePhoneChange}/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Kóði" type="number" value={this.state.code} onChange={this.handleCodeChange}/>
                </FormGroup>

                <Button color="info" type="submit" value="Submit" onClick={this.handleSubmit}>
                  <li>Skrá inn</li>
                  <li><img src={process.env.PUBLIC_URL + "/img/form_arrow.svg"} alt="" /></li>
                </Button>
              </Form>
            </Container>
          </div>

        );
    }
}

export default SignInForm;
