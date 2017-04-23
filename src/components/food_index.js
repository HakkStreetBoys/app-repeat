import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchFood, fetchFoodPromo} from '../actions/index';
import userRefFor from './userRef';
import Product from './Product';
import {Container, Button} from 'reactstrap';

class FoodIndex extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.userRef = userRefFor(this.props.user);
    this.props.fetchFood();
    this.props.fetchFoodPromo();
    this.setState({loading: false});
  }

  renderOffer() {
    return _.map(this.props.offer, (offer, i) => {
      const {
        promo_food_button,
        promo_food_description,
        promo_food_image,
        promo_food_title,
        show_promo_food,
      } = offer[0];
      if (!this.state.loading && show_promo_food !== false) {
        return (
          <div key={i} className="promo_offers">
            <div className="promo_bg">
              <div className="promo_overlay" />
              <img src={promo_food_image.sizes.medium_large} alt="" />
            </div>
            <div className="promo_content">
              <h2>{promo_food_title}</h2>
              <p>{promo_food_description}</p>
              <Button color="success" size="md">{promo_food_button}</Button>
            </div>
          </div>
        );
      }
    });
  }

  renderFood() {
    return this.props.posts.map(post => {
      const userRef = this.userRef;

      this.menu_cat = post.menu_cat[0];
      if (this.menu_cat !== 9) {
        this.menu_cat = 'matur';
      }
      // const drink_cat = post.menu_cat.toString();
      // const drink_cat_replace = drink_cat.replace(drink_cat, 'drykkir');

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
    console.log(this.props.user.uid);
    return (
      <div>
        {this.renderOffer()}
        <div className="product_container">
          {this.renderFood()}
        </div>
        <span className="animate_me"></span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {posts: state.posts.all, offer: state.posts.offer};
}

export default connect(mapStateToProps, {fetchFood, fetchFoodPromo})(FoodIndex);
