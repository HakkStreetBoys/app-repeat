import React from 'react';
import { Link } from 'react-router-dom';
// import { fetchFood } from '../actions/index';
// import { fetchDrinks } from '../actions/index';



const Navigation = ({ user }) => {
  // if(this.props.posts[0].menu_cat[0] == 8) {
  //   console.log('drink');
  // }

  return (
    <div className="navigation">
      <nav>
        <ul>
          <Link to={"/matur"}>
            <img src={process.env.PUBLIC_URL + "/img/matur-icon.svg"} alt="" />
            <li>Matur</li>
          </Link>
          <Link to={`/myorder`}>
            <li className="order_btn">
              <img src={process.env.PUBLIC_URL + "/img/order_logo.svg"} alt="" />
            </li>
          </Link>
          <Link to={"/drykkir"}>
            <img src={process.env.PUBLIC_URL + "/img/drykkir-icon.svg"} alt="" />
            <li>Drykkir</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
