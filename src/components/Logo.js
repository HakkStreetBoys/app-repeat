import React from 'react';

const Logo = () => {
  return (
    <div className="logo">
      <img src={process.env.PUBLIC_URL + "/img/logo.svg"} />
    </div>
  );
};

export default Logo;
