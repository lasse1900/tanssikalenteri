import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import './App.css'

const DanceCalendar = () => {
  return (
    <div>
      <h2>Dance Calendar</h2>
    </div>
  );
}

const Ballrooms = () => {
  return (
    <div>
      <h2>Ballrooms</h2>
    </div>
  );
}

const DanseSchools = () => {
  return (
    <div>
      <h2>Danse Schools</h2>
    </div>
  );
}

const Calendar = () => {
  return (
    <div>
      <h2>Calendar</h2>
    </div>
  );
}

const Videolinks = ({ match }) => {
  return (
    <div>
      <h2>Danse videos</h2>
      <a target='_blank' rel="noopener noreferrer" href="https://www.youtube.com/watch?v=2iR_XlfBPpI">"arg. tango"</a>
    </div>
  )
}

const App = (props) => {

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
    return (<div>
      <Router>
        <Link to="/login" className="link" id="login" data-cy="login">login</Link>
        <Link to="/register" className="link" id="register" data-cy="register">register</Link>
        <Route exact path="/login" render={({ match }) => <LoginForm path={match.path} />} />
        <Route exact path="/register" render={({ match }) => <RegisterForm path={match.path} />} />
        <Redirect to="/" />
      </Router>
    </div>)
  }

  return (
    <div>
      <Router>
        <div>
          <ul>
            <Link className="link" to="/">DanceCalendar</Link>
            <Link className="link" to="/ballrooms">Ballrooms</Link>
            <Link className="link" to="/danseschools">DanseSchools</Link>
            <Link className="link" to="/calendar">Calendar</Link>
            <Link className="link2" to="/videolinks">Videolinks</Link>
            {`Logged in as ${user.name}`} <button onClick={() => handleLogout()}>logout</button>
          </ul>
          <hr />
          <Route exact path="/" component={DanceCalendar} />
          <Route exact path="/ballrooms" component={Ballrooms} />
          <Route exact path="/danseschools" component={DanseSchools} />
          <Route exact path="/calendar" component={Calendar} />
          <Route path="/videolinks" component={Videolinks} />
        </div>
      </Router>
    </div>
  )
}

export default App;