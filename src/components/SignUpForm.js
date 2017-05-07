import React, { Component } from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import { Redirect } from 'react-router-dom'
import { Container, Form, FormGroup, Input, Button, Alert } from 'reactstrap'

const ROOT_AUTH_URL =
	'https://us-central1-one-time-password-c0c13.cloudfunctions.net'

class SignUpForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			phone: '',
			loading: true,
			fireRedirect: false,
			isRegistering: true,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillMount() {
		this.setState({ loading: false })
		document.getElementById('body').className = 'signup_page'
	}

	componentWillUnmount() {
		document.getElementById('body').className = ''
	}

	handleChange(event) {
		this.setState({ phone: event.target.value })
		SignUpForm.phone = event.target.value
		console.log(this.state.phone)

		this.state.phone.length > 6
			? this.setState({ isRegistering: false })
			: this.setState({ isRegistering: true })

			// if (this.state.phone.substring(0,3) === '354') {
			// 	console.log('blah');
			// 	// this.state.phone.slice(3)
			// 	// console.log(this.state.phone.slice(3))
			// 	this.setState({ phone: this.state.phone.slice(3) })
			// }
	}

	handleSubmit(event) {
		this.setState({ loading: true })

		event.preventDefault()
		console.log(this.state.phone)
		// arrow function til að sleppa við .bind(this)
		axios
			.post(`${ROOT_AUTH_URL}/createUser`, {
				phone: this.state.phone,
			})
			.then(() => {
				axios.post(`${ROOT_AUTH_URL}/requestOneTimePassword`, {
					phone: this.state.phone,
				})
			})
			.then(() => {
				this.setState({ fireRedirect: true })
				// const { from } = this.props.location.state || '/';
				const { fireRedirect } = this.state
				fireRedirect && <Redirect to={'/code'} />
				this.setState({ loading: false })
			})
			.catch(error => {
				this.setState({
					loading: false,
					isRegistering: true,
					errorMessage: error.response.data.error.message,
				})
				console.log(error)
			})
	}

	render() {
		console.log(this.state.phone.length)
		if (this.state.loading) {
			return <Spinner />
		}

		console.log(this.state)
		const { fireRedirect } = this.state

		return (
			<div className="sign_up">
				<div className="overlay" />
				<img
					className="login_logo"
					src={process.env.PUBLIC_URL + '/img/logo.svg'}
					alt=""
				/>
				<Container>
					<Form onSubmit={this.handleSubmit}>
						{this.state.errorMessage &&
							<Alert color="warning">{this.state.errorMessage}</Alert>}
						<FormGroup>
							<Input
								type="number"
								placeholder="Símanúmer"
								pattern="[0-9]*"
								inputMode="numeric"
								value={this.state.phone}
								onChange={this.handleChange}
							/>
						</FormGroup>

						{/* <Link to="/code"> */}
						<Button
							disabled={this.state.isRegistering}
							type="submit"
							color="success"
							className="main-btn"
						>
							{/* {this.state.isRegistering ? "Registering..." : "Register"} */}
							Senda <span>kóða</span>
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
