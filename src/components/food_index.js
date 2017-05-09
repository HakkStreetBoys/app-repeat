import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchFood, fetchFoodPromo } from '../actions/index'
import userRefFor from './userRef'
import Product from './Product'
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	FormGroup,
	Input,
} from 'reactstrap'
import Spinner from './Spinner'
import Logo from './Logo'

class FoodIndex extends Component {
	state = {
		loading: true,
		modal: false,
		tableNumber: null,
	}

	componentDidMount() {
		this.userRef = userRefFor(this.props.user)
		this.userRef.on('value', snapshot => {
			this.setState({ tableNumber: snapshot.val().tableNumber })
		})
		this.userRef.on('value', snapshot => {
			const obj = snapshot.val()
			console.log(obj)

			if (!obj.tableNumber) {
				this.setState({ modal: !this.state.modal })
			}
		})
		this.props.fetchFood()
		this.props.fetchFoodPromo()
		setTimeout(() => {
			this.setState({ loading: false })
		}, 500)
	}

	componentWillUnmount() {
		// this.userRef.child('orders/').off();
	}

	renderOffer() {
		return _.map(this.props.offer, (offer, i) => {
			const {
				promo_food_button,
				promo_food_description,
				promo_food_image,
				promo_food_title,
				show_promo_food,
			} = offer[0]
			if (!this.state.loading && show_promo_food !== false) {
				return (
					<div key={i} className="promo_offers">
						<div className="promo_bg">
							<div className="promo_overlay" />
							<img src={promo_food_image.sizes.medium_large} alt="" />
						</div>
						<div className="promo_content">
							<h2>{promo_food_title}</h2>
							<p>{promo_food_description}</p>
							<Button color="success" size="md">{promo_food_button}
								<span>
									<img className="promo_svg" src={process.env.PUBLIC_URL + '/img/order_btn_inner2.svg'} />
								</span></Button>
						</div>
					</div>
				)
			}
		})
	}

	renderFood() {
		return this.props.posts.map(post => {
			const userRef = this.userRef

			this.menu_cat = post.menu_cat[0]
			if (this.menu_cat !== 9) {
				this.menu_cat = 'matur'
			}
			// const drink_cat = post.menu_cat.toString();
			// const drink_cat_replace = drink_cat.replace(drink_cat, 'drykkir');

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

	handleChange(e) {
		this.setState({ tableNumber: e.target.value })
	}

	toggle() {
		this.setState({ modal: !this.state.modal })

		this.userRef.update({
			tableNumber: this.state.tableNumber,
			totalPrice: 0,
		})
	}

	render() {
		console.log(this.state)

		if (this.state.loading) {
			return <Spinner />
		}

		console.log(this.props)
		return (
			<div>
				<Logo />
				<Modal isOpen={this.state.modal}>
					<ModalHeader toggle={this.toggle}>Veldu borðnúmer</ModalHeader>
					<ModalBody>
						<FormGroup>
							<Input
								type="select"
								value={this.state.tableNumber}
								onChange={this.handleChange.bind(this)}
							>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
								<option>7</option>
								<option>8</option>
								<option>9</option>
							</Input>

						</FormGroup>
						<Button color="primary" onClick={this.toggle.bind(this)}>
							Staðfesta
						</Button>
					</ModalBody>
				</Modal>
				{this.renderOffer()}
				<div className="product_container">
					{this.renderFood()}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { posts: state.posts.all, offer: state.posts.offer }
}

export default connect(mapStateToProps, { fetchFood, fetchFoodPromo })(
	FoodIndex
)
