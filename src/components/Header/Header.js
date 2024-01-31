// Header.js
import React from 'react';
import { FaBars } from 'react-icons/fa';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header>
      <div className="logo">Your Logo</div>
      <div className="menu-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>
    </header>
  );
};

export default Header;
