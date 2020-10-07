import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 px-6 py-1 bg-white border-b z-20">
      <NavLink className="block" exact to={`/`}>
        <h1 className="font-semibold text-2xl text-center sm:text-left">
          <span role="img" aria-label="Emoji : Kaba Sharif">
            🕋
          </span>{' '}
          Masjid Finder{' '}
          <span role="img" aria-label="Emoji : Masjid">
            🕌
          </span>
        </h1>
      </NavLink>
    </header>
  );
};
