import React, { Component, Radix } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchDrinks, fetchDrinkPromo } from '../actions/posts'
// import firebase from 'firebase';
import userRefFor from './userRef'
// import { Link } from 'react-router-dom';
import Product from './Product'
import Spinner from './Spinner'
import { Button } from 'reactstrap'
import Logo from './Logo'

class DrinkIndex extends Component {
	state = {
		loading: true,
		tableNumber: null,
	}

	componentDidMount() {
		this.userRef = userRefFor(this.props.user)
		this.userRef.on('value', snapshot => {
			this.setState({ tableNumber: snapshot.val().tableNumber })
		})
		this.props.fetchDrinks()
		this.props.fetchDrinkPromo()
		setTimeout(() => {
			this.setState({ loading: false })
		}, 500)
	}

	componentWillUnmount() {
		// TODO: SKOÐA BETUR
		// this.userRef.child('orders/').off();
		// this.userRef.off();
	}

	renderOffer() {
		return _.map(this.props.offer, (offer, i) => {
			const {
				promo_drink_button,
				promo_drink_description,
				promo_drink_image,
				promo_drink_title,
				promo_drink_price,
				promo_drink_category,
				show_promo_drink,
			} = offer[0]
			if (!this.state.loading && show_promo_drink !== false) {
				return (
					<div key={i} className="promo_offers">
						<div className="promo_bg">
							<div className="promo_overlay" />
							<img src={promo_drink_image.sizes.medium_large} alt="" />
						</div>
						<div className="promo_content">
							<h2>{promo_drink_title}</h2>
							<p>{promo_drink_description}</p>
							<Button
								color="success"
								size="md"
								onClick={() => {
									let doesExist = false
									this.userRef.child('orders/').once('value', snapshot => {
										const obj = snapshot.val()
										for (var variable in obj) {
											if (obj && obj[variable].title === promo_drink_title) {
												doesExist = true
												this.userRef.child('orders/' + variable).update({
													price: parseInt(obj[variable].price, Radix) +
														parseInt(promo_drink_price, Radix),
													quantity: parseInt(obj[variable].quantity, Radix) + 1,
												})
											} else {
											}
										}
										if (!doesExist) {
											this.userRef.child('orders').push({
												title: promo_drink_title,
												price: promo_drink_price,
												category: promo_drink_category,
												status_item: 0,
												status_pay: 0,
												date: Date(),
												createdAt: Date.now(),
												userID: this.props.user.uid,
												quantity: 1,
												original_price: promo_drink_price,
												table_number: this.state.tableNumber,
											})
										}
									})
								}}
							>
								{promo_drink_button}
								<span>
									<img
										className="promo_svg"
										src={process.env.PUBLIC_URL + '/img/order_btn_inner2.svg'}
										alt=""
									/>
								</span>
							</Button>
						</div>
					</div>
				)
			}
		})
	}

	renderDrinks() {
		return this.props.posts.map(post => {
			const userRef = this.userRef

			this.menu_cat = post.menu_cat[0]
			if (this.menu_cat !== 8) {
				this.menu_cat = 'drykkur'
			}

			return (
				<Product
					post={post}
					key={post.id}
					userRef={userRef}
					category={this.menu_cat}
					uid={this.props.user.uid}
					tableNumber={this.state.tableNumber}
				/>
			)
		})
	}

	render() {
		if (this.state.loading) {
			return <Spinner />
		}

		return (
			<div>
				<Logo />
				{this.renderOffer()}
				<div className="product_container">
					{this.renderDrinks()}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { posts: state.posts.all, offer: state.posts.offer }
}

export default connect(mapStateToProps, { fetchDrinks, fetchDrinkPromo })(
	DrinkIndex
)
