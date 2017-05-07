import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost } from '../actions/index'
// import axios from 'axios';
import { Button } from 'reactstrap'
// import Slider from 'react-slick';
import userRefFor from './userRef'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class SinglePost extends Component {
	state = {
		loading: true,
		tableNumber: null,
	}

	componentDidMount() {
		document.getElementById('body').className = 'single_page'
		this.userRef = userRefFor(this.props.user)
		this.userRef.on('value', snapshot => {
			this.setState({ tableNumber: snapshot.val().tableNumber })
		})
		this.props.fetchPost(this.props.match.params.id)
		console.log(this.props)
		this.setState({ loading: false })
	}

	componentWillUnmount() {
		document.getElementById('body').className = ''
		this.setState({ isLoading: true })
	}

	render() {
		if (this.state.loading) {
			return <span>isloading</span>
		}

		const { post, isLoading, related } = this.props
		console.log('in render', related)
		if (isLoading) {
			return <div>isLoading</div>
		}

		const { menu_title, menu_price, menu_tags, menu_description } = post.acf
		const { medium_large } = post.acf.menu_image.sizes

		let tags
		if (menu_tags != null) {
			tags = menu_tags.map(menu_tag => (
				<div key={menu_tag.name}><li>{menu_tag.name}</li></div>
			))
		}

		let relatedItems
		if (related != null) {
			relatedItems = related.map(relate => (
				<div key={relate.data.id}>
					<img src={relate.data.acf.menu_image.sizes.medium} alt="" />
				</div>
			))
		}

		this.menu_cat = post.menu_cat[0]
		if (this.menu_cat === 9) {
			this.menu_cat = 'drykkur'
		} else if (this.menu_cat === 8) {
			this.menu_cat = 'matur'
		} else {
			this.menu_cat = 'eitthvadannadenmaturogdrykkur'
		}

		return (
			<ReactCSSTransitionGroup>
				<div className="single_item">
					<Link to="/">
						<img
							src={process.env.PUBLIC_URL + '/img/arrow-back.svg'}
							alt=""
							className="back_arrow"
						/>
					</Link>
					<div className="single_hero">
						<img src={medium_large} alt="" />
					</div>
					<div className="single_info">
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<h2>{menu_title}</h2>
							<Button
								color="success"
								size="md"
								onClick={() => {
									let doesExist = false
									this.userRef.child('orders/').once('value', snapshot => {
										const obj = snapshot.val()
										console.log(obj)
										for (var variable in obj) {
											if (
												obj &&
												obj[variable].productID === this.props.post.id
											) {
												console.log('exists')
												doesExist = true
												this.userRef.child('orders/' + variable).update({
													price: parseInt(obj[variable].price) +
														parseInt(menu_price),
													quantity: parseInt(obj[variable].quantity) + 1,
												})
											} else {
												console.log('not exist')
											}
										}
										console.log(this.userRef.child('orders/'))
										if (!doesExist) {
											this.userRef.child('orders').push({
												title: menu_title,
												price: menu_price,
												category: this.menu_cat,
												productID: this.props.post.id,
												status_item: 0,
												status_pay: 0,
												date: Date(),
												createdAt: Date.now(),
												userID: this.props.user.uid,
												quantity: 1,
												original_price: menu_price,
												table_number: this.state.tableNumber,
											})
										}
									})
								}}
							>
								Panta
							</Button>
						</div>
						<p className="single_price">{menu_price} kr.</p>
						<p>{menu_description}</p>
						<div className="single_tags">
							{tags}
						</div>
					</div>
					<div className="related_items">
						{related &&
							<div>
								<h3>Eitthvað annað?</h3>
								{relatedItems}
							</div>}
					</div>
				</div>
			</ReactCSSTransitionGroup>
		)
	}
}

function mapStateToProps(state) {
	return {
		...state.posts,
	}
}

export default connect(mapStateToProps, { fetchPost })(SinglePost)
