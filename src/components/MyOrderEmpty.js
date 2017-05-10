import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Button } from 'reactstrap'

const MyOrderEmpty = () => {
	return (
		<Col xs="12">
			<div className="pending_order order_empty">
				<div>
					<h2>Pöntunarlisti tómur</h2>
					<img src={process.env.PUBLIC_URL + '/img/smiley-empty.svg'} alt="" />
					<p>Hvernig væri að panta sér einn ískaldan?</p>
				</div>
				<Link to="/matur">
					<Button className="afturmatsedill" color="primary">
						Aftur í matseðil
					</Button>
				</Link>
			</div>
		</Col>
	)
}

export default MyOrderEmpty
