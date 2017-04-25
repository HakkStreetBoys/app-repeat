import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions/index';
// import axios from 'axios';
import {Button} from 'reactstrap';

class SinglePost extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
    console.log(this.props);
  }

  render() {
    const {post, isLoading, related} = this.props;
    console.log('in render', related);
    if (isLoading) {
      return <div>isLoading</div>;
    }

    const {
      menu_title,
      menu_price,
      menu_tags,
      menu_description,
      menu_related,
    } = post.acf;
    const {medium_large} = post.acf.menu_image.sizes;

    let tags;
    if (menu_tags != null) {
      tags = menu_tags.map(menu_tag => (
        <div key={menu_tag.name}><li>{menu_tag.name}</li></div>
      ));
    }

    let relatedItems;
    if (related != null) {
      relatedItems = related.map(relate => (
        <div key={relate.data.id}>
          {relate.data.acf.menu_title}
        </div>
      ));
    }

    return (
      <div>
        {/* <Link to="/"><img src="../style/img/arrow-back.svg" alt="Back" className="back_arrow" /></Link> */}
        <div className="single_hero">
          <img src={medium_large} alt="" />
        </div>
        <div className="single_info">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2>{menu_title}</h2>
            <Button color="success" size="md">Panta</Button>
          </div>
          <p className="single_price">{menu_price} kr.</p>
          <p>{menu_description}</p>
          <div className="single_tags">
            {tags}
          </div>
        </div>
        <div className="related_items">
          {related && relatedItems}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.posts,
  };
}

export default connect(mapStateToProps, {fetchPost})(SinglePost);
