import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchDrinks, fetchDrinkPromo} from '../actions/index';
// import firebase from 'firebase';
import userRefFor from './userRef';
// import { Link } from 'react-router-dom';
import Product from './Product';
import Spinner from './Spinner';
import {Container} from 'reactstrap';

class DrinkIndex extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.userRef = userRefFor(this.props.user);
    this.props.fetchDrinks();
    this.props.fetchDrinkPromo();
    this.setState({loading: false});
  }

  renderOffer() {
    return _.map(this.props.offer, (offer, i) => {
      const {
        promo_drink_button,
        promo_drink_description,
        promo_drink_image,
        promo_drink_title,
        show_promo_drink,
      } = offer[0];
      if (!this.state.loading && show_promo_drink !== false) {
        return (
          <div key={i} className="promo_offers">
            <div className="promo_bg">
              <div className="promo_overlay" />
              <img src={promo_drink_image.sizes.medium_large} alt="" />
            </div>
            <div className="promo_content">
              <h2>{promo_drink_title}</h2>
              <p>{promo_drink_description}</p>
              <a href="#"><button>{promo_drink_button}</button></a>
            </div>
          </div>
        );
      }
    });
  }

  renderDrinks() {
    if (this.state.loading === true) {
      return <Spinner />;
    }

    return this.props.posts.map(post => {
      const userRef = this.userRef;

      this.menu_cat = post.menu_cat[0];
      if (this.menu_cat !== 8) {
        this.menu_cat = 'drykkur';
      }

      return (
        <Product
          post={post}
          key={post.id}
          userRef={userRef}
          category={this.menu_cat}
          uid={this.props.user.uid}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderOffer()}
        <Container className="product_container">
          {this.renderDrinks()}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {posts: state.posts.all, offer: state.posts.offer};
}

export default connect(mapStateToProps, {fetchDrinks, fetchDrinkPromo})(
  DrinkIndex,
);
