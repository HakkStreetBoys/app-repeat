import React, {Component} from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import {Redirect} from 'react-router-dom'
import {Container, Form, FormGroup, Input, Button, Alert} from 'reactstrap'

const ROOT_AUTH_URL =
  'https://us-central1-one-time-password-c0c13.cloudfunctions.net'

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      loading: true,
      fireRedirect: false,
      isRegistering: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    this.setState({loading: false})
  }

  handleChange (event) {
    this.setState({phone: event.target.value})
    SignUpForm.phone = event.target.value
    console.log(this.state.phone)

    this.state.phone.length >= 7
      ? this.setState({isRegistering: false})
      : this.setState({isRegistering: true})
  }

  handleSubmit (event) {
    this.setState({loading: true})

    event.preventDefault()
    console.log(this.state.phone)
    // arrow function til að sleppa við .bind(this)
    axios
      .post(`${ROOT_AUTH_URL}/createUser`, {
        phone: this.state.phone
      })
      .then(() => {
        axios.post(`${ROOT_AUTH_URL}/requestOneTimePassword`, {
          phone: this.state.phone
        })
      })
      .then(() => {
        this.setState({fireRedirect: true})
        // const { from } = this.props.location.state || '/';
        const {fireRedirect} = this.state
        fireRedirect && <Redirect to={'/code'} />
        this.setState({ loading: false })
      })
      .catch((error) => {
        this.setState({
          loading: false,
          isRegistering: true,
          errorMessage: error.response.data.error.message
        })
        console.log(error)
      })
  }

  render () {

    if (this.state.loading) {
      return <Spinner />
    }

    console.log(this.state)
    const {fireRedirect} = this.state

    return (
      <div className='sign_up'>
        <Container>
          <img
            className='login_logo'
            src={process.env.PUBLIC_URL + '/img/logo.svg'}
            alt=''
          />
          <Form onSubmit={this.handleSubmit}>
            {this.state.errorMessage &&
              <Alert color='warning'>{this.state.errorMessage}</Alert>}
            <FormGroup>
              <Input
                type='number'
                placeholder='Símanúmer'
                pattern="[0-9]*"
                inputMode="numeric"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </FormGroup>

            {/* <Link to="/code"> */}
            <Button
              disabled={this.state.isRegistering}
              type='submit'
              color='info'
            >
              {/* {this.state.isRegistering ? "Registering..." : "Register"} */}
              <li>Senda kóða</li>
              <li>
                <img
                  src={process.env.PUBLIC_URL + '/img/form_arrow.svg'}
                  alt=''
                />
              </li>
            </Button>
            {/* </Link> */}
            {fireRedirect &&
              <Redirect to={'/login/code'} phone={this.state.phone} />}
          </Form>
        </Container>
      </div>
    )
  }
}

export default SignUpForm
