import React from 'react';
import { Navbar } from './Navbar';

interface Props {
  Component: React.ComponentClass;
}

const Layout: React.FC<Props> = ({ Component }) => {
  return (
    <div className="antialiased mt-10 bg-gray-300">
      <Navbar />
      <Component />
    </div>
  );
};

export default Layout;
