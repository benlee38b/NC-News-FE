import React from 'react';
import { Link } from '@reach/router';

export const HomeButton = () => {
  return (
    <button className="home-button">
      <Link to="/">
        <img
          src="https://img.icons8.com/flat_round/64/000000/home--v1.png"
          alt="home-icon"
        />
      </Link>
    </button>
  );
};
