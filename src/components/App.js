import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'
import axios from 'axios'
import Spinner from './Spinner'
import firebase from './firebase'
import FoodIndex from './food_index'
import DrinkIndex from './drink_index'
import SinglePost from './single_post'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import MyOrder from './MyOrder'
import PaymentOption from './PaymentOption'
import PaymentSubmit from './PaymentSubmit'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Navigation from './Navigation'
import { Navbar, Nav, NavItem, NavbarToggler } from 'reactstrap'

const ROOT_AUTH_URL =
	'https://us-central1-one-time-password-c0c13.cloudfunctions.net'

class App extends Component {
	constructor(props) {
		super(props)

		this.toggle = this.toggle.bind(this)
		this.state = {
			user: undefined,
			isOpen: false,
			errorMsg: null,
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			setTimeout(() => {
				this.setState({ user })
			}, 2000)
		})
	}

	componentWillUnmount() {
		this.unsubscribeAuthStateChanged()
	}

	toggle() {
		this.setState({ isOpen: !this.state.isOpen, errorMsg: null })
	}

	logOut() {
		firebase
			.database()
			.ref('users')
			.child(this.state.user.uid)
			// .child('confirmed_order')
			.once('value', snapshot => {
				snapshot.val().totalPrice !== 0
					? this.setState({
							errorMsg: 'Þú verður að greiða reikninginn áður en þú aftengir símanúmerið.',
						})
					: firebase
							.auth()
							.signOut()
							.then(() => {
								this.setState({ isOpen: false })
								axios.post(`${ROOT_AUTH_URL}/deleteUser`, {
									phone: this.state.user.uid,
								})
							})
							.catch(error => {
								console.log(error)
							})
			})
	}

	presentation = () => {
		const { user } = this.state
		return (
			<Router>
				<div>
					{user &&
						<div>
							<Navbar color="faded" light toggleable>
								<NavbarToggler right onClick={this.toggle} />
								{this.state.isOpen
									? <div className="popup">
											<Nav>
												<NavItem onClick={this.logOut.bind(this)}>
													{this.state.errorMsg && <p>{this.state.errorMsg}</p>}
													Útskráning
												</NavItem>
											</Nav>
										</div>
									: <div />}
							</Navbar>
						</div>}
					{user && <Navigation user={user} />}

					{user !== undefined
						? <div>
								<Switch>
									<Route
										exact
										path="/"
										user={user}
										render={() => {
											return <Redirect to="/matur" />
										}}
									/>

									<Route
										exact
										path="/login"
										render={() => {
											if (user) {
												return <Redirect to="/matur" />
											} else {
												return <SignUpForm />
											}
										}}
									/>
									<PublicRoute
										path="/login/code"
										component={SignInForm}
										user={user}
									/>
									<PrivateRoute
										exact
										path="/matur"
										component={FoodIndex}
										user={user}
									/>
									<PrivateRoute
										exact
										path="/drykkir"
										component={DrinkIndex}
										user={user}
									/>
									<PrivateRoute
										location={location}
										key={location.key}
										path="/matur/:id"
										component={SinglePost}
										user={user}
									/>

									<PrivateRoute
										path="/myorder"
										component={MyOrder}
										user={user}
									/>
									<PrivateRoute
										exact
										path="/payment"
										component={PaymentOption}
										user={user}
									/>
									<PrivateRoute
										path="/payment/submit"
										component={PaymentSubmit}
										user={user}
									/>
								</Switch>
							</div>
						: <Spinner />}
				</div>
			</Router>
		)
	}

	render() {
		// console.log(this.state)
		return (
			<div>
				{this.presentation()}
			</div>
		)
	}
}

export default App
