import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

const NotFound = () => {
  return (
    <Container className="not_found">
      <h1>Ooooops!</h1>
      <span className="not_found_emoji">😱😱😱</span>
      <p>Við finnum ekki síðuna sem þú ert að leita af.</p>
      <Link to="/matur">
        <Button color="info">
          <li>Til baka í matseðil</li>
          <li><img src={process.env.PUBLIC_URL + "/img/form_arrow.svg"} alt="" /></li>
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
