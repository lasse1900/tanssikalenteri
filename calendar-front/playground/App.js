import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'  // Redirect
import loginService from './services/login'
import { useField } from './hooks'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const Tanssikalenteri = () => {
  return (
    <div>
      <h2>Tanssikalenteri</h2>
    </div>
  );
}

const Tanssipaikat = () => {
  return (
    <div>
      <h2>Tanssipaikat</h2>
    </div>
  );
}

const Tanssikoulut = () => {
  return (
    <div>
      <h2>Tanssikoulut</h2>
    </div>
  );
}

const Kalenteri = () => {
  return (
    <div>
      <h2>Kalenteri</h2>
    </div>
  );
}

const Videolinkit = ({ match }) => {
  return (
    <div>
      <h2>Tanssivideot</h2>
      <a target='_blank' rel="noopener noreferrer" href="https://www.youtube.com/watch?v=2iR_XlfBPpI">"arg. tango"</a>
    </div>
  )
}

const App = (props) => {
  const username = useField('username')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      // console.log('credentials', credentials)
      const user = await loginService.login(
        credentials
      )
      window.localStorage.setItem('loggedBallroomAppUser', JSON.stringify(user))

      setUser(user)
      username.reset('')
      password.reset('')
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    // console.log('hookWitoutReset', JSON.stringify(hookWithoutReset))
    return hookWithoutReset
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBallroomAppUser')
    // notify(`${user.username} logged out`, false)
    setUser(null)
  }

  if (user === null) {
    
    return (<div>
      <button onClick={event => window.location.href = '/login'}>Login</button>
      <button onClick={event => window.location.href = '/register'}>Register</button>
      <Router>
        <Route exact path='/login' render={() => <LoginForm className='loginform'
          username={omitReset(username)}
          password={omitReset(password)}
          handleSubmit={handleLogin} />} />
        <Route exact path='/register' render={() => <RegisterForm />} />
      </Router>
    </div>)
  }

  return (
    <div>
      <Router>
        <div>
          <ul>
            <Link className="link" to="/">Tanssikalenteri</Link>
            <Link className="link" to="/tanssipaikat">Tanssipaikat</Link>
            <Link className="link" to="/tanssikoulut">Tanssikoulut</Link>
            <Link className="link" to="/kalenteri">Kalenteri</Link>
            <Link className="link2" to="/videolinkit">Videolinkit</Link>
            {`Logged in as ${user.name}`} <button onClick={() => handleLogout()}>logout</button>
          </ul>
          <hr />
          <Route exact path="/" component={Tanssikalenteri} />
          <Route exact path="/tanssipaikat" component={Tanssipaikat} />
          <Route exact path="/tanssikoulut" component={Tanssikoulut} />
          <Route exact path="/kalenteri" component={Kalenteri} />
          <Route path="/videolinkit" component={Videolinkit} />
        </div>
      </Router>
    </div>
  )
}

export default App;