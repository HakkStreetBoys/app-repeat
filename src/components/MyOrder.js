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
import NumberFormat from 'react-number-format'

class MyOrder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			orderData: [],
			confirmedOrders: [],
			orderConfirmed: false,
			activeTab: '1',
			totalPrice: 0,
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
		this.userRef.on('value', snapshot => {
			this.setState({ totalPrice: snapshot.val().totalPrice })
		})
		this.userRef.child('orders/').on('value', snapshot => {
			var obj = snapshot.val()
			this.setState({ orderData: obj, loading: false })
		})
	}

	componentDidMount() {
		this.userRef.child('confirmed_order/').on('value', snapshot => {
			var conf_obj = snapshot.val()
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

		// console.log(this.totalPrice)

		// this.userRef.update({ totalPrice:  })

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
						src={process.env.PUBLIC_URL + '/img/smiley-confirmed.svg'}
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
            <Link to="/matur">
    					<Button className="afturmatsedill" color="primary">Aftur í matseðil</Button>
    				</Link>
					</div>
				</ReactCSSTransitionGroup>
			)
		}

		return _.map(this.state.orderData, (order, key) => {
			this.totalPrice += parseInt(order.price, 10)

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
								<p><NumberFormat className="total_price" value={order.price} displayType={'text'} thousandSeparator={'.'}></NumberFormat> kr.</p>
								<Button
									color="danger"
									onClick={() => {
										this.userRef
											.child('orders/' + key)
											.once('value', snapshot => {
												const obj = snapshot.val()
												if (obj.quantity !== 1) {
													this.userRef.child('orders/' + key).update({
														price: parseInt(order.price, 10) -
															parseInt(obj.original_price, 10),
														quantity: parseInt(obj.quantity, 10) - 1,
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
													price: parseInt(order.price, 10) +
														parseInt(obj.original_price, 10),
													quantity: parseInt(obj.quantity, 10) + 1,
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

				if (conf_order.status_pay !== 1) {
					console.log('ege')
					this.confirmedPrice += parseInt(conf_order.price, 10)
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
										<p><NumberFormat className="total_price" value={conf_order.price} displayType={'text'} thousandSeparator={'.'}></NumberFormat> kr.</p>
									</Col>
								</Row>
							</Col>
						</Row>
					)
				}
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
						<div className="splitter">
							{this.state.confirmedOrders !== null && this.state.totalPrice !== 0 && <div className={this.state.activeTab === '1' ? 'splitter_inner' : 'splitter_inner active'}></div>}
						</div>
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
						{this.state.confirmedOrders !== null && this.state.totalPrice !== 0 &&
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
											<NumberFormat className="total_price" value={this.totalPrice} displayType={'text'} thousandSeparator={'.'}></NumberFormat> kr.
										</p>
										<Button
											className="main-btn"
											onClick={(() => {
												// console.log(this.totalPrice)
												// console.log(this.confirmedPrice)
												this.userRef.update({
													totalPrice: this.confirmedPrice += parseInt(this.totalPrice)
												})
												this.confirmOrder()

											})}
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
											<NumberFormat className="total_price" value={this.confirmedPrice} displayType={'text'} thousandSeparator={'.'}></NumberFormat> kr.
										</p>
										<Link to="/payment">
											<Button
												onClick={() => {
													// this.userRef.update({
													// 	totalPrice: this.confirmedPrice,
													// })
												}}
												color="success"
												className="main-btn submit-payment-btn"
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
