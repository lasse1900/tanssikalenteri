import React from 'react';
import { Link } from 'react-router-dom';

const NavBarLogin = () => (
  <nav>
    <Link to="/login">Login</Link>{'        '}<Link to="/register">Register</Link>
  </nav>
)

export default NavBarLogin;



// import React from 'react';
// import { Link } from 'react-router-dom';

// const NavBarLogin = () => (
//   <nav>
//     <ul>
//       <li>
//         <Link to="/login">Login</Link>
//       </li>
//       <li>
//         <Link to="/register">Register</Link>
//       </li>
//     </ul>
//   </nav>
// )

// export default NavBarLogin;