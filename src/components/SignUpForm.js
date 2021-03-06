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

		event.target.value.length >= 7
			? this.setState({ isRegistering: false })
			: this.setState({ isRegistering: true })
	}

	handleSubmit(event) {
		this.setState({ loading: true })

		event.preventDefault()
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
				const { fireRedirect } = this.state
				fireRedirect && <Redirect to={'/code'} />
				this.setState({ loading: false })
			})
			.catch(error => {
				console.log(this.state.phone)
				const errorMessage = error.response.data.error.message
				const errorCode = error.response.data.error.code
				this.setState({
					loading: false,
					errorMessage: errorMessage,
				})
				if (errorCode === 'auth/uid-already-exists') {
					this.setState({
						errorMessage: 'Þú ert skráður inn í öðru tæki. Sendu kóða aftur til að skrá þig inn á núverandi tæki.',
					})
					axios.post(`${ROOT_AUTH_URL}/deleteUser`, {
						phone: '354' + this.state.phone,
					})
				} else {
					this.setState({
						loading: false,
						errorMessage: errorMessage,
					})
				}
				console.log(error)
				console.log(errorMessage)
			})
	}

	render() {
		if (this.state.loading) {
			return <Spinner />
		}

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
							<Alert color="warning">
								{this.state.errorMessage}
							</Alert>}
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
							<Redirect
								to={'/login/code'}
								phone={this.state.phone}
							/>}
					</Form>
				</Container>
			</div>
		)
	}
}

export default SignUpForm
