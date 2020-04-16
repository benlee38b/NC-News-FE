import React from 'react';
import { Link } from '@reach/router';

export const HomeButton = () => {
  return (
    <Link to="/" className="home-button">
      <i className="fas fa-home"></i>
    </Link>
  );
};
