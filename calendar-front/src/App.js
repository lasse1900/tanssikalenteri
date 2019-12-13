import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom'
import ballroomService from './services/ballrooms'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { useField } from './hooks'
import { setMessage } from './reducers/notificationReducer'
import { initializeBallrooms, removeBallroom } from './reducers/ballroomReducer'
import { loginUser, setUser, logoutUser } from './reducers/userReducer'
import BallroomList from './components/BallroomList'
import Users from './components/Users'
import User from './components/User'
import { initializeUsers } from './reducers/userReducer'
import Ballroom from './components/Ballroom'
import './index.css'
import { Container } from 'semantic-ui-react'
import NavBarLogin from './NavBarLogin'

const App = ({
  user,
  users,
  initializeBallrooms,
  setMessage,
  loginUser,
  setUser,
  logoutUser,
  ballrooms
}) => {
  const username = useField('username')
  const password = useField('password')

  useEffect(() => {
    initializeBallrooms()
  }, [])

  useEffect(() => {
    initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      ballroomService.setToken(user.token)
    }
  }, [])

  const notify = (message, error) => {
    setMessage({ message, error }, 4)
  }

  // const handleLogin = async (event) => {
  //   event.preventDefault()

  //   const credentials = {
  //     username: username.value,
  //     password: password.value
  //   }

  //   try {
  //     const user = await loginUser(credentials)
  //     username.reset()
  //     password.reset()

  //     notify(`${user.username} successfully logged in`)
  //   } catch (exception) {
  //     notify('wrong username or password', 'error')
  //   }
  // }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  const userId = id => users.find(user => user.id === id)
  const ballroomId = id => ballrooms.find(ballroom => ballroom.id === id)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    notify(`${user.username} successfully logged out`, false)
    setUser(null)
    logoutUser()
  }

  if (user === null) {
    return (
      <Container>
        <div>
          <Router>
            <NavBarLogin />
            <Switch>
              <Route path="/login" render={({ match }) => <LoginForm path={match.path} />} />
              <Route path="/register" render={({ match }) => <RegisterForm path={match.path} />} />
            </Switch>
          </Router>
        </div>
      </Container>)
  }

  return (
    <Container>
      <div>
        <Router>
          <div className='menuStyle'>
            <Link to="/" id="ballrooms" data-cy="ballrooms" >ballrooms</Link>{' '}
            <Link to="/users" id="users" data-cy="users">users</Link>
            {' '}{user.username} logged in {' '}
            <button data-cy="logout" onClick={handleLogout}>logout</button>
          </div>
          <h2>Ballroom app</h2>
          <Notification />
          <button data-cy="logout" onClick={handleLogout}>logout</button>
          <Route exact path="/" render={() =>
            <BallroomList
              notify={notify}
            />}
          />
          <Route exact path="/users" render={({ match }) => <Users path={match.path} />} />
          <Route path="/users/:id" render={({ match }) => <User user={userId(match.params.id)} />} />
          <Route exact path="/ballrooms/:id" render={({ match }) => <Ballroom notify={notify} ballroom={ballroomId(match.params.id)} />} />
          <Redirect to="/" />
        </Router>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    ballrooms: state.ballrooms,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeBallrooms,
  initializeUsers,
  removeBallroom,
  setMessage,
  loginUser,
  setUser,
  logoutUser
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp