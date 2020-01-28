import React from 'react';
import { Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const NavBarLogin = (props) => (

  <div>
    <Route path="/login" render={() => <LoginForm notify={props.notify} />} />
    <Route path="/register" render={() => <RegisterForm notify={props.notify} />} />
  </div>

)

export default NavBarLogin


// <Switch>
// <Link to="/login"></Link>
// <Link to="/register"></Link>
// </Switch>