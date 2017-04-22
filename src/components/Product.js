import React from 'react';
import { Link } from 'react-router-dom';
// import arrow from '../public/img/arrow.svg'
import firebase from './firebase';
import { Button } from 'reactstrap';

const Product = (props) => {
  const { menu_title, menu_price } = props.post.acf;
  // const { menu_cat } = post;
  const { medium_large } = props.post.acf.menu_image.sizes;



  return (
    <div className="product_item">
      <Link to={`matur/${props.post.id}`}>
        <div className="product_img">
          <div className="product_gradient"></div>
          <img src={medium_large} alt="" />
        </div>
      </Link>
      <div className="product_info">
        <Link to={`matur/${props.post.id}`}>
          <h2>{menu_title}</h2>
          <p>{menu_price} kr.</p>
        </Link>
        {/* <Link to={`matur/${props.post.id}`}>
          <img className="arrow" src={process.env.PUBLIC_URL + '/img/arrow.svg'} alt="Nánar" />
        </Link> */}
      </div>
      <div className="product_order">
        <Button color="success" size="md"
          onClick={() =>
            props.userRef.child('orders')
              .push({
                title: menu_title,
                price: menu_price,
                category: props.category,
                productID: props.post.id,
                status_food: 0,
                status_drink: 0,
                status_pay: 0,
                date: Date(),
                createdAt: Date.now(),
                table_number: 7,
                userID: props.uid
              })

            }>
          Panta
        </Button>
      </div>
      {/* <div
        onClick={() =>
          props.userRef.child('orders')
            .push({
              title: menu_title,
              price: menu_price,
              category: props.category,
              productID: props.post.id,
              status_food: 0,
              status_drink: 0,
              status_pay: 0,
              date: Date(),
              createdAt: Date.now(),
              table_number: 7,
              userID: props.uid

            })
            // .then((snap) => {
            //   const key = snap.key
            // })
          }
        className="product_btn">
        <ul>
          <li>Bæta við pöntun</li>
          <li>{menu_price} kr.</li>
        </ul>
      </div> */}

    </div>
  );
};

export default Product;
