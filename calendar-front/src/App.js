import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NavBar from './NavBar'
import DanceCalendar from './pages/DanceCalendar'
import DanseSchools from './pages/DanceSchools'
import Ballrooms from './pages/Ballrooms'
import Calendar from './pages/Calendar'
import Videolinks from './pages/VideoLinks'
import NotFoundPage from './pages/NotFoundPage'
import { Container } from 'semantic-ui-react'
import './App.css'

const App = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBallroomappUser')
    // notify(`${user.username} logged out`, false)
    setUser(null)
  }

  if (user === null) {
    return (
      <Container>
        <div>
          <Router>
            <Link to="/login" className="link" id="login" data-cy="login">login</Link>
            <Link to="/register" className="link" id="register" data-cy="register">register</Link>
            <Route path="/login" render={({ match }) => <LoginForm path={match.path} />} />
            <Route path="/register" render={({ match }) => <RegisterForm path={match.path} />} />
            <Redirect exact to="/" />
          </Router>
        </div>
      </Container>)
  }

  return (
    <Container>
      <Router>
        <div className="App">
          <NavBar />
          <div id="page-body">
            <Switch>
              <Route exact path="/" component={DanceCalendar} />
              <Route path="/ballrooms" component={Ballrooms} />
              <Route path="/danseschools" component={DanseSchools} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/videolinks" component={Videolinks} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
        <button className="login-button" onClick={() => handleLogout()}>logout</button>
      </Router>
    </Container>
  );
}

export default App;