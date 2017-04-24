import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Product extends Component {

  state = {
    reRender: 0,
    status: 'notification hidden',
  }

  constructor(props) {
    super(props);

    this.notify = false;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.notify = true;
    this.setState({ status: 'notification visible' });
    setTimeout(() => {
       this.notify = false;
       this.setState({ status: 'notification hidden' });
     }, 2000);

  }

  render() {
    const { menu_title, menu_price } = this.props.post.acf;
    // const { menu_cat } = post;
    const { medium_large } = this.props.post.acf.menu_image.sizes;
    return (
      <div className="product_item">
        <Link to={`matur/${this.props.post.id}`}>
          <div className="product_img">
            <div className="product_gradient"></div>
            {/* {console.log(notify)} */}
            <div className={this.state.status}>
              <img src={process.env.PUBLIC_URL + "/img/notify_order.svg"} />
              <img src={process.env.PUBLIC_URL + "/img/notify_arrow.svg"} />
            </div>
            <img src={medium_large} alt="" />
          </div>
        </Link>
        <div className="product_info">
          <Link to={`matur/${this.props.post.id}`}>
            <h2>{menu_title}</h2>
            <p>{menu_price} kr.</p>
          </Link>
          {/* <Link to={`matur/${props.post.id}`}>
            <img className="arrow" src={process.env.PUBLIC_URL + '/img/arrow.svg'} alt="Nánar" />
          </Link> */}
        </div>
        <div className="product_order">
          <Button color="success" size="md"
            onClick={() => {
              // console.log(post);
              this.handleClick();
              setTimeout(() => {
                this.notify = false
              }, 2000);
              this.setState({ reRender: ++this.state.reRender });
              this.props.userRef.child('orders')
                .push({
                  title: menu_title,
                  price: menu_price,
                  category: this.props.category,
                  productID: this.props.post.id,
                  status_food: 0,
                  status_drink: 0,
                  status_pay: 0,
                  date: Date(),
                  createdAt: Date.now(),
                  table_number: 7,
                  userID: this.props.uid
                })

              }}>
            Panta
          </Button>
        </div>

      </div>
    )
  }

}

export default Product;
