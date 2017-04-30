import React, {Component} from 'react'
import _ from 'lodash'
import userRefFor from './userRef'
// import Spinner from './Spinner';
import MyOrderEmpty from './MyOrderEmpty'
import {Container, Col, Button, Row} from 'reactstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MyOrder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      orderData: [],
      orderConfirmed: false
    }

    this.totalPrice = 0
    this.handleClick = this.handleClick.bind(this)
    this.confirmOrder = this.confirmOrder.bind(this)
  }

  componentWillMount () {
    document.getElementById('body').className = 'my_order'
    this.key = undefined
    this.userRef = userRefFor(this.props.user)
    this.userRef.child('orders/').on('value', snapshot => {
      var obj = snapshot.val()
      // console.log(obj);
      this.setState({orderData: obj, loading: false})
    })
  }

  componentWillUnmount () {
    document.getElementById('body').className = ''
    this.userRef.child('orders/').off()
  }

  confirmOrder () {
    this.userRef.child('confirmed_order/').push(this.state.orderData)
    this.userRef.child('orders/').remove()

    this.setState({orderConfirmed: true})
  }

  handleClick (e) {
    e.preventDefault()
    this.userRef.child('orders/' + this.key).remove()
  }

  renderOrders () {
    if (this.state.orderData === null && this.state.orderConfirmed === false) {
      return <MyOrderEmpty />
    }

    if (this.state.orderConfirmed === true) {
      return (
        <div>
          <div>ORDER CONFIRMED</div>
          <div
            onClick={() => {
              this.setState({orderConfirmed: false})
            }}
          >
            Loka
          </div>
        </div>
      )
    }

    return _.map(this.state.orderData, (order, key) => {
      // console.log(order.length);
      // if (order && order.length < 1) {
      //   console.log('less than 1');
      // } else {
      //   console.log('more than 1');
      // }
      this.totalPrice += parseInt(order.price)
      // console.log(order);

      return (
        <Row key={key}>
          <Col className='pending_order' xs='12'>
            <Row>
              <Col xs='3'>
                <div className='quantity'>
                  {/* <div></div> */}
                  <span>{order.quantity}x</span>
                </div>
              </Col>
              <Col xs='9'>
                <h2>{order.title}</h2>
                <p>{order.price} kr.</p>
                <Button
                  color='danger'
                  onClick={() => {
                    this.userRef
                      .child('orders/' + key)
                      .once('value', snapshot => {
                        const obj = snapshot.val()
                        if (obj.quantity !== 1) {
                          this.userRef.child('orders/' + key).update({
                            price: parseInt(order.price) -
                              parseInt(obj.original_price),
                            quantity: parseInt(obj.quantity) - 1
                          })
                        } else {
                          this.userRef
                            .child('orders/' + key)
                            .remove(() =>
                              this.setState({orderData: this.state.orderData})
                            )
                        }
                      })
                  }}
                >
                  Eyða
                </Button>
                <Button
                  color='success'
                  onClick={() => {
                    this.userRef
                      .child('orders/' + key)
                      .once('value', snapshot => {
                        const obj = snapshot.val()
                        this.userRef.child('orders/' + key).update({
                          price: parseInt(order.price) +
                            parseInt(obj.original_price),
                          quantity: parseInt(obj.quantity) + 1
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

  render () {
    this.totalPrice = 0
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={200}
        transitionEnter={true}
        transitionLeave={false}
        >
        <div id='my_order'>
          <Container>
            {this.renderOrders()}
          </Container>
          <div className="pending_total_order">
            {/* <Button color="success"> */}
            {this.state.orderData !== null && !this.state.loading &&
              <div className="pending_total_order_inner">
              <p>Samtals <span className="total_price">{this.totalPrice} kr.</span></p>
              <Button color="success" size="md">Senda <span>Pöntun</span></Button>
            </div>}
          </div>
        </div>
      </ReactCSSTransitionGroup>

    )
  }
}

export default MyOrder
