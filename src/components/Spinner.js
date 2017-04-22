import React from 'react';

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={process.env.PUBLIC_URL + "/img/spinner.svg"}></img>
      <img src={process.env.PUBLIC_URL + "/img/spinner-inner.svg"}></img>
      {/* <span></span>
      <span></span>
      <span></span> */}
    </div>
  );
};

export default Spinner;
