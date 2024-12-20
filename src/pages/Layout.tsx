import React, { ReactNode } from 'react';
import Navbar from '../components/partials/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-4 p-10">
        {children}
      </div>
    </>
  );
};

export default Layout;
