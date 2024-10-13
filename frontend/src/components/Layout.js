// src/components/Layout.js
import React from 'react';
import './Layout.css'; // Add styles for layout

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        {/* Navbar component */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Footer component */}
      </footer>
    </div>
  );
};

export default Layout;
