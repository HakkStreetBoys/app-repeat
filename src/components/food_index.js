import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFood } from '../actions/index';
import firebase from 'firebase';
import userRefFor from './userRef';
// import { Link } from 'react-router-dom';
import Product from './Product';

class FoodIndex extends Component {
  state = {
    loading: true
  }

  componentWillMount() {
    this.userRef = userRefFor(this.props.user);
    this.props.fetchFood();
    this.setState({ loading: false });
  }

  renderFood() {
    if(this.state.loading === true) {
      return <div>loading...</div>
    }

    return this.props.posts.map((post) => {
      const userRef = this.userRef;
      // const drink_cat = post.menu_cat.toString();
      // const drink_cat_replace = drink_cat.replace(drink_cat, 'drykkir');

      return (
        <Product
          post={post}
          key={post.id}
          userRef={userRef}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="container product_container">
          {this.renderFood()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchFood })(FoodIndex);
