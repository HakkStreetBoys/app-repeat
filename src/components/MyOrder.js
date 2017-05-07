import React, { Component } from 'react'
import _ from 'lodash'
import userRefFor from './userRef'
// import Spinner from './Spinner';
import MyOrderEmpty from './MyOrderEmpty'
import { Link } from 'react-router-dom'
import {
	Container,
	Col,
	Button,
	Row,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'

class MyOrder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			orderData: [],
			confirmedOrders: [],
			orderConfirmed: false,
			activeTab: '1',
		}

		this.totalPrice = 0
		this.confirmedPrice = 0
		this.handleClick = this.handleClick.bind(this)
		this.confirmOrder = this.confirmOrder.bind(this)
	}

	componentWillMount() {
		document.getElementById('body').className = 'my_order'
		this.key = undefined
		this.userRef = userRefFor(this.props.user)
		this.userRef.child('orders/').on('value', snapshot => {
			var obj = snapshot.val()
			// console.log(obj);
			this.setState({ orderData: obj, loading: false })
		})
	}

	componentDidMount() {
		this.userRef.child('confirmed_order/').on('value', snapshot => {
			var conf_obj = snapshot.val()
			// console.log(obj);
			this.setState({ confirmedOrders: conf_obj, loading: false })
		})
	}

	componentWillUnmount() {
		document.getElementById('body').className = ''
		// this.userRef.child('orders/').off();
	}

	confirmOrder() {
		this.userRef.child('confirmed_order/').push(this.state.orderData)
		this.userRef.child('orders/').remove()

		this.setState({ orderConfirmed: true })
	}

	handleClick(e) {
		e.preventDefault()
		this.userRef.child('orders/' + this.key).remove()
	}

	renderOrders() {
		if (this.state.orderData === null && this.state.orderConfirmed === false) {
			return (
				<ReactCSSTransitionGroup
					component="div"
					className="empty_delay"
					transitionName="delay"
					transitionAppear={true}
					transitionAppearTimeout={300}
					transitionEnter={false}
					transitionLeave={false}
				>
					<MyOrderEmpty />
				</ReactCSSTransitionGroup>
			)
		}

		if (this.state.orderConfirmed === true) {
			return (
				<ReactCSSTransitionGroup
					component="div"
					className="order_confirmed"
					transitionName="delay"
					transitionAppear={true}
					transitionAppearTimeout={300}
					transitionEnter={false}
					transitionLeave={false}
				>
					<p>Pöntun móttekin!</p>
					<img
						src={process.env.PUBLIC_URL + '/img/order_confirmed.svg'}
						alt=""
					/>
					<p>
						Þú getur haft það rólegt og pantað meira. Svo þegar þú ert tilbúinn að borga getur þú gert það undir "Reikningur"
					</p>
					<div />
					<div
						onClick={() => {
							this.setState({ orderConfirmed: false })
						}}
					>
						<Button color="success" size="md">
							Loka
						</Button>
					</div>
				</ReactCSSTransitionGroup>
			)
		}

		return _.map(this.state.orderData, (order, key) => {
			this.totalPrice += parseInt(order.price)

			return (
				<Row key={key}>
					<Col className="pending_order" xs="12">
						<Row>
							<Col xs="3">
								<div className="quantity">
									{/* <div></div> */}
									<span>{order.quantity}x</span>
								</div>
							</Col>
							<Col xs="9">
								<h2>{order.title}</h2>
								<p>{order.price} kr.</p>
								<Button
									color="danger"
									onClick={() => {
										this.userRef
											.child('orders/' + key)
											.once('value', snapshot => {
												const obj = snapshot.val()
												if (obj.quantity !== 1) {
													this.userRef.child('orders/' + key).update({
														price: parseInt(order.price) -
															parseInt(obj.original_price),
														quantity: parseInt(obj.quantity) - 1,
													})
												} else {
													this.userRef
														.child('orders/' + key)
														.remove(() =>
															this.setState({ orderData: this.state.orderData })
														)
												}
											})
									}}
								>
									Eyða
								</Button>
								<Button
									color="success"
									onClick={() => {
										this.userRef
											.child('orders/' + key)
											.once('value', snapshot => {
												const obj = snapshot.val()
												this.userRef.child('orders/' + key).update({
													price: parseInt(order.price) +
														parseInt(obj.original_price),
													quantity: parseInt(obj.quantity) + 1,
												})
											})
									}}
								>
									Bæta við
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			)
		})
	}

	renderConfirmedOrders() {
		return _.map(this.state.confirmedOrders, (confirmed_order, key) => {
			return _.map(confirmed_order, (conf_order, key) => {
				this.confirmedPrice += parseInt(conf_order.price)
				return (
					<Row key={key}>
						<Col className="pending_order" xs="12">
							<Row>
								<Col xs="3">
									<div className="quantity">
										{/* <div></div> */}
										<span>{conf_order.quantity}x</span>
									</div>
								</Col>
								<Col xs="9">
									<h2>{conf_order.title}</h2>
									<p>{conf_order.price} kr.</p>
								</Col>
							</Row>
						</Col>
					</Row>
				)
			})
		})
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab,
			})
		}
	}

	render() {
		console.log(this.state)
		this.totalPrice = 0
		this.confirmedPrice = 0
		return (
			<ReactCSSTransitionGroup
				transitionName="example"
				transitionAppear={true}
				transitionAppearTimeout={200}
				transitionEnter={false}
				transitionLeave={false}
			>
				<div id="my_order">
					<Link to="/" className="myorder_exit">
						<img src={process.env.PUBLIC_URL + '/img/close-icon.svg'} alt="" />
					</Link>
					<Nav tabs>
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === '1' })}
								onClick={() => {
									this.toggle('1')
								}}
							>
								Pöntun
							</NavLink>
						</NavItem>
						{this.state.confirmedOrders !== null &&
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === '2',
									})}
									onClick={() => {
										this.toggle('2')
									}}
								>
									Reikningur
								</NavLink>
							</NavItem>}
					</Nav>
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<Container>
								<ReactCSSTransitionGroup
									component="div"
									transitionName="slide"
									transitionLeaveTimeout={300}
									transitionEnter={false}
									transitionLeave={true}
								>
									{this.renderOrders()}

								</ReactCSSTransitionGroup>
							</Container>
							<div className="pending_total_order">
								{this.state.orderData !== null &&
									!this.state.loading &&
									<div className="pending_total_order_inner">
										<p>
											Samtals
											{' '}
											<span className="total_price">{this.totalPrice} kr.</span>
										</p>
										<Button
											className="main-btn"
											onClick={this.confirmOrder}
											color="success"
											size="md"
										>
											Senda <span>Pöntun</span>
										</Button>
									</div>}
							</div>
						</TabPane>
						<TabPane tabId="2">
							<Container>
								{this.renderConfirmedOrders()}
							</Container>
							<div className="pending_total_order">
								{this.state.confirmedOrders !== null &&
									!this.state.loading &&
									<div className="pending_total_order_inner">
										<p>
											Samtals
											{' '}
											<span className="total_price">
												{this.confirmedPrice} kr.
											</span>
										</p>
										<Link to="/payment">
											<Button
												onClick={() => {
													this.userRef.update({
														totalPrice: this.confirmedPrice,
													})
												}}
												color="success"
												className="main-btn"
												size="md"
											>
												Borga
											</Button>
										</Link>

									</div>}
							</div>
						</TabPane>
					</TabContent>

				</div>
			</ReactCSSTransitionGroup>
		)
	}
}

export default MyOrder




// TODO: fleh
