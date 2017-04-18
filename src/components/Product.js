import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
// import arrow from '../public/img/arrow.svg'

const Product = ({ post, userRef }) => {
  const { menu_title, menu_price } = post.acf;
  const { medium_large } = post.acf.menu_image.sizes;

  return (
    <div className="product">
      <div className="product_img">
        <img src={medium_large} alt="" />
      </div>
      <div className="product_info">
        <h2>{menu_title}</h2>
        <Link to={`matur/${post.id}`}>
          <img className="arrow" src={process.env.PUBLIC_URL + '/img/arrow.svg'} alt="Nánar" />
        </Link>
      </div>
      <div
        onClick={() =>
          userRef.child('orders')
            .push({
              title: menu_title,
              price: menu_price,
              category: post.menu_cat[0],
              productID: post.id
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
