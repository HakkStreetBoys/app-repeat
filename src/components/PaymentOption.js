import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'reactstrap'
import userRefFor from './userRef'
import NumberFormat from 'react-number-format'

class PaymentOption extends Component {
	state = {
		selectedPayment: null,
	}

	componentWillMount() {
		document.getElementById('body').className = 'pay'
		this.userRef = userRefFor(this.props.user)

		this.userRef.once('value', snapshot => {
			this.setState({ totalPrice: snapshot.val().totalPrice })
		})
	}

	componentWillUnmount() {
		document.getElementById('body').className = ''
		this.userRef.off()
	}

	render() {
		console.log(this.props)
		return (
			<div className="payment">
				<Container>
					<Link to="/myorder">
						<img
							src={process.env.PUBLIC_URL + '/img/arrow-back.svg'}
							alt=""
							className="back_arrow"
						/>
					</Link>
					<h2>Veldu greiðsluleið</h2>
					<div className="payment_option">
						<div
							onClick={() =>
								this.setState({ selectedPayment: 'kass_selected' })}
							className={
								this.state.selectedPayment === 'kass_selected'
									? 'payment_option_bg kass_bg kass_selected'
									: 'payment_option_bg kass_bg'
							}
						>
							<img src={process.env.PUBLIC_URL + '/img/kass.svg'} alt="Kass" />
							<img src={process.env.PUBLIC_URL + '/img/kass2.svg'} alt="Kass" />
						</div>
						<div className="payment_option_bg">
							<span>Kreditkort</span>
						</div>
					</div>
				</Container>
				<div className="payment_shape">
					<div className="payment_shape_inner">
						{this.state.totalPrice !== 0 &&
							<p>
								Samtals
								{' '}

								<NumberFormat className="total_price" value={this.state.totalPrice} displayType={'text'} thousandSeparator={'.'}></NumberFormat> kr.
							</p>}
						<Link to="payment/submit">
							<Button
								className="main-btn"
								disabled={!this.state.selectedPayment}
								color="success"
								size="md"
							>
								Næsta <span>skref</span>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default PaymentOption
