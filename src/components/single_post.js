import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost } from '../actions/index'
import { Button } from 'reactstrap'
import userRefFor from './userRef'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import NumberFormat from 'react-number-format'

class SinglePost extends Component {
	state = {
		loading: true,
		tableNumber: null,
	}

	componentDidMount() {
		window.scrollTo(0, 0)
		document.getElementById('body').className = 'single_page'
		this.userRef = userRefFor(this.props.user)
		this.userRef.on('value', snapshot => {
			this.setState({ tableNumber: snapshot.val().tableNumber })
		})
		this.props.fetchPost(this.props.match.params.id)
		this.setState({ loading: false })
	}

	componentWillReceiveProps(nextProps) {
		if (
			this.props.match &&
			this.props.match.params.id !== nextProps.match.params.id
		) {
			this.props.fetchPost(nextProps.match.params.id)
			window.scrollTo(0, 0)
		}
	}

	componentWillUnmount() {
		document.getElementById('body').className = ''
		this.setState({ isLoading: true })
	}

	renderSingleProduct = () => {
		console.log(this.props)
		if (this.state.loading) {
			return <span>isloading</span>
		}

		const { post, isLoading, related } = this.props
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
				<Link to={`/matur/${relate.data.id}`} key={relate.data.id}>
					<div className="related_container">
						<div className="related_img">
							{/* <div className="related_gradient" /> */}
							<div className="product_gradient" />
							<div className="related_inner">
								<h2>{relate.data.acf.menu_title}</h2>
								<p><NumberFormat value={relate.data.acf.menu_price} displayType={'text'} thousandSeparator={'.'}></NumberFormat> kr.</p>
							</div>
							<img src={relate.data.acf.menu_image.sizes.medium} alt="" />
						</div>
					</div>
				</Link>
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
			<div className="">
				<Link to="/">
					<img
						src={process.env.PUBLIC_URL + '/img/arrow-back.svg'}
						alt=""
						className="back_arrow"
					/>
				</Link>
				<div className="single_hero">
					<div className="product_gradient" />
					<img src={medium_large} alt="" />
					<div className="single_hero_content">
						<div className="single_hero_info">
							<h2>{menu_title}</h2>
							<p className="single_price"><NumberFormat className="total_price" value={menu_price} displayType={'text'} thousandSeparator={'.'}></NumberFormat> kr.</p>
						</div>
						<div className="single_hero_order">
							<Button
								color="success"
								size="md"
								className="main-order-btn"
								onClick={() => {
									let doesExist = false
									this.userRef.child('orders/').once('value', snapshot => {
										const obj = snapshot.val()
										for (var variable in obj) {
											if (
												obj &&
												obj[variable].productID === this.props.post.id
											) {
												doesExist = true
												this.userRef.child('orders/' + variable).update({
													price: parseInt(obj[variable].price) +
														parseInt(menu_price),
													quantity: parseInt(obj[variable].quantity) + 1,
												})
											} else {
											}
										}
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
								<span>Panta</span>
								<span>
									<img
										src={process.env.PUBLIC_URL + '/img/order_btn_inner.svg'}
										alt=""
									/>
								</span>
							</Button>
						</div>

					</div>
				</div>
				<div className="single_info">
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					/>
					<p>{menu_description}</p>
					<div className="single_tags">
						{tags}
					</div>
				</div>
				<div className="related_items">
					{related &&
						<div>
							<h3>Gott með</h3>
							{relatedItems}
						</div>}
				</div>
			</div>
		)
	}

	render() {
		return (
			<div>
				<ReactCSSTransitionGroup
					component="div"
					className="single_item"
					transitionName="example"
		      transitionAppear={true}
		      transitionAppearTimeout={500}
		      transitionEnter={false}
		      transitionLeave={false}
					>
					{this.renderSingleProduct()}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		...state.posts,
	}
}

export default connect(mapStateToProps, { fetchPost })(SinglePost)
