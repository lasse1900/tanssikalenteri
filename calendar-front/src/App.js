import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom'
import ballroomService from './services/ballrooms'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { setMessage } from './reducers/notificationReducer'
import { initializeBallrooms, removeBallroom } from './reducers/ballroomReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import BallroomList from './components/BallroomList'
import Users from './components/Users'
import User from './components/User'
import DanseSchools from './components/DanceSchools'
import VideoLinks from './components/VideoLinks'
import Calendar from './components/Calendar'
import AboutPage from './components/AboutPage'
import { initializeUsers } from './reducers/userReducer'
import Ballroom from './components/Ballroom'
import { Container } from 'semantic-ui-react'
import NavBarLogin from './NavBarLogin'
import RegisterInfo from './components/RegisterInfo'
import './index.css'

const App = ({
  user,
  users,
  initializeBallrooms,
  setMessage,
  setUser,
  logoutUser,
  ballrooms
}) => {

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
      console.log('App.js - user token:', user.token)
      setUser(user)
      ballroomService.setToken(user.token)
    }
  }, [])

  const notify = (message, error) => {
    setMessage({ message, error }, 4)
  }

  const userId = id => users.find(user => user.id === id)
  const ballroomId = id => ballrooms.find(ballroom => ballroom.id === id)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBallroomAppUser')
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
              <Route path="/login" render={() => <LoginForm notify={notify} />} />
              <Route path="/registerInfo" render={() => <RegisterInfo notify={notify} />} />
              <Route path="/register" render={() => <RegisterForm notify={notify} />} />
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
            <Link to="/" id="home" data-cy="home" >ballrooms</Link>{' '}
            <Link to="/schools" id="schools" data-cy="schools">schools</Link>{' '}
            <Link to="/videos" id="videos" data-cy="videos">videos</Link>{' '}
            <Link to="/calendar" id="calendar" data-cy="calendar">calendar</Link>{' '}
            <Link to="/about" id="about" data-cy="about">about</Link>{' '}
            {' <'}{user.username}> logged in {' '}
            <button data-cy="logout" onClick={handleLogout}>logout</button>
          </div>
          <h2><em>Ballroom app</em></h2>
          <Notification />
          <Route exact path="/" render={() => <BallroomList notify={notify} />} />
          <Route exact path="/users" render={({ match }) => <Users path={match.path} />} />
          <Route exact path="/users/:id" render={({ match }) => <User user={userId(match.params.id)} />} />
          <Route exact path="/schools" render={({ match }) => <DanseSchools path={match.path} />} />
          <Route exact path="/videos" render={({ match }) => <VideoLinks path={match.path} />} />
          <Route exact path="/calendar" render={({ match }) => <Calendar path={match.path} />} />
          <Route exact path="/about" render={({ match }) => <AboutPage path={match.path} />} />
          <Route exact path="/ballrooms/:id" render={({ match }) => <Ballroom notify={notify} ballroom={ballroomId(match.params.id)} />} />
          <Redirect to="/" />
        </Router>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
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
  setUser,
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)