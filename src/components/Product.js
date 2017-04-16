import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ post }) => {
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
          <img className="arrow" src="../style/img/arrow.svg" alt="Nánar" />
        </Link>
      </div>
      <div className="product_btn">
        <ul>
          <li>Bæta við pöntun</li>
          <li>{menu_price} kr.</li>
        </ul>
      </div>

    </div>
  );
};

export default Product;
