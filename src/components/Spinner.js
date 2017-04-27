import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={process.env.PUBLIC_URL + "/img/spinner.svg"} alt=""></img>
      <img src={process.env.PUBLIC_URL + "/img/spinner-inner.svg"} alt=""></img>
    </div>
  );
};

export default Spinner;
