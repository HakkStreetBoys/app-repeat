import React from 'react';

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={process.env.PUBLIC_URL + "/img/spinner.svg"} alt=""></img>
      <img src={process.env.PUBLIC_URL + "/img/spinner-inner.svg"} alt=""></img>
    </div>
  );
};

export default Spinner;
