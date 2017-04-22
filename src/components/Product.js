import React from 'react';
import { Link } from 'react-router-dom';
// import arrow from '../public/img/arrow.svg'
import firebase from './firebase';

const Product = (props) => {
  const { menu_title, menu_price } = props.post.acf;
  // const { menu_cat } = post;
  const { medium_large } = props.post.acf.menu_image.sizes;



  return (
    <div className="product">
      <div className="product_img">
        <img src={medium_large} alt="" />
      </div>
      <div className="product_info">
        <h2>{menu_title}</h2>
        <Link to={`matur/${props.post.id}`}>
          <img className="arrow" src={process.env.PUBLIC_URL + '/img/arrow.svg'} alt="Nánar" />
        </Link>
      </div>
      <div
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
      </div>

    </div>
  );
};

export default Product;
