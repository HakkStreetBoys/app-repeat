import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';

class SinglePost extends Component {

  componentWillMount() {
    this.oldPost = "";
    this.props.fetchPost(this.props.match.params.id);
  }

  render() {
    // console.log(this.props.params);
    const { post } = this.props;

    if (!post || (post === this.oldPost)) {
      return <div>Loading...</div>;
    }

    this.oldPost = post;

    const { menu_title, menu_price, menu_tags, menu_description } = post.acf;
    const { medium_large } = post.acf.menu_image.sizes;

    let tags;
    if (menu_tags != null) {
      tags = menu_tags.map(menu_tag =>
        <div key={menu_tag.name}><li>{menu_tag.name}</li></div>
      );
    }

    return (
      <div>
        {/* <Link to="/"><img src="../style/img/arrow-back.svg" alt="Back" className="back_arrow" /></Link> */}
        <div className="single_hero">
          <img src={medium_large} alt="" />
        </div>
        <div className="container">
          <div className="single_info">
            <h2>{menu_title}</h2>
            <p>{menu_description}</p>
          </div>
          <div className="product_btn">
            <ul>
              <li>Bæta við pöntun</li>
              <li>{menu_price} kr.</li>
            </ul>
          </div>
          <div className="single_tags">
            {tags}
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost })(SinglePost);
