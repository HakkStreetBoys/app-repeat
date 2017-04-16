import React, {Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_AUTH_URL = 'https://us-central1-one-time-password-c0c13.cloudfunctions.net';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: ''
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
            phone: this.state.phone,
            code: this.state.code
        }).then((response) => {
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
        return (
            <form>
                <div>
                    <label>
                        Phone:
                        <input type="text" value={this.state.phone} onChange={this.handlePhoneChange}/>
                    </label>
                    <label>
                        Code:
                        <input type="text" value={this.state.code} onChange={this.handleCodeChange}/>
                    </label>
                </div>

                <Button type="submit" value="Submit" onClick={this.handleSubmit}></Button>
            </form>
        );
    }
}

export default SignInForm;
