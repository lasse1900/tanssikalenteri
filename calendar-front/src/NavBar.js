import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/home">DanceCalendar</Link>
      </li>
      <li>
        <Link to="/ballrooms">Ballrooms</Link>
      </li>
      <li>
        <Link to="/schools">DanceSchools</Link>
      </li>
      <li>
        <Link to="/calendar">Calendar</Link>
      </li>
      <li>
        <Link to="/videos">VideoLinks</Link>
      </li>
    </ul>
  </nav>
)

export default NavBar;