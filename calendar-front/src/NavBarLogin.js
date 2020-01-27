import React from 'react';
import { Link } from 'react-router-dom';

const NavBarLogin = () => (
  <nav>
    <Link to="/login"></Link>
    <Link to="/register"></Link>
  </nav>
)

export default NavBarLogin;