import React, { Component } from 'react'
import axios from 'axios'
import firebase from 'firebase'
import { Container, Form, FormGroup, Input, Button, Alert } from 'reactstrap'
import SignUpForm from './SignUpForm'
import Spinner from './Spinner'

const ROOT_AUTH_URL =
	'https://us-central1-one-time-password-c0c13.cloudfunctions.net'

class SignInForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			phone: '',
			code: '',
			loading: true,
			errorMessage: '',
		}

		this.handleCodeChange = this.handleCodeChange.bind(this)
		this.handlePhoneChange = this.handlePhoneChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillMount() {
		document.getElementById('body').className = 'signup_page'
		this.setState({ loading: false })
	}

	componentWillUnmount() {
		document.getElementById('body').className = ''
	}

	handleCodeChange(event) {
		this.setState({ code: event.target.value })
	}

	handlePhoneChange(event) {
		this.setState({ phone: event.target.value })
	}

	handleSubmit(event) {
		this.setState({ loading: true })
		event.preventDefault()
		let response = axios
			.post(`${ROOT_AUTH_URL}/verifyOneTimePassword`, {
				phone: SignUpForm.phone,
				code: this.state.code,
			})
			.then(response => {
				firebase.auth().signInWithCustomToken(response.data.token)
				// console.log(response.data.token)
			})
			.catch(error => {
				this.setState({
					loading: false,
					errorMessage: 'Villa kom upp. Prófaðu aftur',
				})
				console.log(error)
			})

		// console.log(response)
		// console.log(response.data);
	}

	render() {

		if (this.state.loading) {
			return <Spinner />
		}

		return (
			<div className="sign_up">
				<div className="overlay" />
				<img
					className="login_logo"
					src={process.env.PUBLIC_URL + '/img/logo.svg'}
					alt=""
				/>
				<Container>
					<Form>
						{this.state.errorMessage !== '' &&
							<Alert color="warning">{this.state.errorMessage}</Alert>}
						{/* <FormGroup>
							{SignUpForm.phone !== undefined
								? <p>{SignUpForm.phone}</p>
								: <Input
										placeholder="Símanúmer"
										value={this.state.phone}
										onChange={this.handlePhoneChange}
									/>}
						</FormGroup> */}
						<FormGroup>
							<Input
								placeholder="Kóði"
								type="number"
								value={this.state.code}
								onChange={this.handleCodeChange}
							/>
						</FormGroup>

						<Button
							color="success"
							className="main-btn"
							type="submit"
							value="Submit"
							onClick={this.handleSubmit}
						>
							Skrá <span>inn</span>
						</Button>
					</Form>
				</Container>
			</div>
		)
	}
}

export default SignInForm
