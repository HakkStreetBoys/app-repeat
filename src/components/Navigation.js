import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import userRefFor from './userRef'
import _ from 'lodash'

class Navigation extends Component {
	constructor(props) {
		super(props)

		this.state = {
			notify: false,
			items: 0,
		}
	}

	componentWillMount() {
		console.log('will receive props')
		this.userRef = userRefFor(this.props.user)
		this.userRef.child('orders').off()
		this.userRef.child('orders/').on('value', snapshot => {
			const obj = snapshot.val()
			// console.log(obj.le)
			this.setState({ notify: true })
			this.setState({ items: _.keys(obj).length })
			console.log(obj)

			setTimeout(() => {
				this.setState({ notify: false })
			}, 800)
		})
	}

	componentWillUnmount() {
		// this.userRef.child('orders').off()
	}

	render() {
		console.log(this.state.items)
		return (
			<div className="navigation">
				<nav>
					<ul>
						<NavLink to={'/matur'}>
							<img
								src={process.env.PUBLIC_URL + '/img/matur-icon.svg'}
								alt=""
							/>
							<li>Matseðill</li>
						</NavLink>
						<NavLink to={`/myorder`} className="order_link">
							<li
								className={this.state.notify ? 'order_btn notify' : 'order_btn'}
							>
								{this.state.items !== 0 &&
									<div className="count_items">
										<span>{this.state.items}</span>
									</div>}
								<img
									className="order_icon_light"
									src={process.env.PUBLIC_URL + '/img/order_logo.svg'}
									alt=""
								/>
								<img
									className="order_icon_dark"
									src={process.env.PUBLIC_URL + '/img/order_logo_black.svg'}
									alt=""
								/>
							</li>
						</NavLink>
						<NavLink to={'/drykkir'}>
							<img
								src={process.env.PUBLIC_URL + '/img/drykkir-icon.svg'}
								alt=""
							/>
							<li>Drykkir</li>
						</NavLink>
					</ul>
				</nav>
			</div>
		)
	}
}

export default Navigation
