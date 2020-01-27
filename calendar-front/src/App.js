import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import ballroomService from './services/ballrooms'
import schoolService from './services/schools'
import videoService from './services/videos'
import calendarService from './services/calendars'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { setMessage } from './reducers/notificationReducer'
import { initializeBallrooms, removeBallroom } from './reducers/ballroomReducer'
import { initializeSchools, removeSchool } from './reducers/schoolReducer'
import { initializeVideos, removeVideo } from './reducers/videoReducer'
import { initializeCalendars, removeCalendar } from './reducers/calendarReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import BallroomList from './components/BallroomList'
import SchoolList from './components/SchoolList'
import VideoList from './components/VideoList'
import CalendarList from './components/CalendarList'
import Users from './components/Users'
import User from './components/User'
import Calendar from './components/Calendar'
import AboutPage from './components/AboutPage'
import { initializeUsers } from './reducers/userReducer'
import Ballroom from './components/Ballroom'
import School from './components/School'
import Video from './components/Video'
import { Container } from 'semantic-ui-react'
import NavBarLogin from './NavBarLogin'
import RegisterInfo from './components/RegisterInfo'
import NotFoundPage from './components/NotFoundPage'
import './index.css'

const App = ({
  user,
  users,
  initializeBallrooms,
  initializeSchools,
  initializeVideos,
  initializeCalendars,
  setMessage,
  setUser,
  logoutUser,
  ballrooms,
  videos,
  calendars,
  schools
}) => {

  useEffect(() => {
    initializeBallrooms()
    initializeSchools()
    initializeVideos()
    initializeCalendars()
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      schoolService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      videoService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      calendarService.setToken(user.token)
    }
  }, [])

  const notify = (message, error) => {
    setMessage({ message, error }, 4)
  }

  const userId = id => users.find(user => user.id === id)
  const ballroomId = id => ballrooms.find(ballroom => ballroom.id === id)
  const schoolId = id => schools.find(school => school.id === id)
  const videoId = id => videos.find(video => video.id === id)
  const calendarId = id => calendars.find(calendar => calendar.id === id)

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
            <Redirect to="/login" />
          </Router>
        </div>
      </Container>)
  }

  return (
    <Container>
      <div>
        <Router>
          <div className='menuStyle'>
            <Link to="/" id="about" data-cy="about">about</Link>{' '}
            <Link to="/ballrooms" id="home" data-cy="home" >ballrooms</Link>{' '}
            <Link to="/schools" id="schools" data-cy="schools">schools</Link>{' '}
            <Link to="/videos" id="videos" data-cy="videos">videos</Link>{' '}
            <Link to="/calendars" id="calendars" data-cy="calendars">calendar</Link>{' '}
            {' <'}{user.username}> logged in {' '}
            <button data-cy="logout" onClick={handleLogout}>logout</button>
          </div>
          <Notification />
          <Switch>
            <Route exact path="/ballrooms" render={() => <BallroomList notify={notify} />} />
            <Route exact path="/schools" render={() => <SchoolList notify={notify} />} />
            <Route exact path="/videos" render={() => <VideoList notify={notify} />} />
            <Route exact path="/calendars" render={() => <CalendarList notify={notify} />} />
            <Route exact path="/users" render={({ match }) => <Users path={match.path} />} />
            <Route exact path="/users/:id" render={({ match }) => <User user={userId(match.params.id)} />} />
            <Route exact path="/calendar" render={({ match }) => <Calendar path={match.path} />} />
            <Route exact path="/" render={({ match }) => <AboutPage path={match.path} />} />
            <Route exact path="/ballrooms/:id" render={({ match }) => <Ballroom notify={notify} ballroom={ballroomId(match.params.id)} />} />
            <Route exact path="/schools/:id" render={({ match }) => <School notify={notify} school={schoolId(match.params.id)} />} />
            <Route exact path="/videos/:id" render={({ match }) => <Video notify={notify} video={videoId(match.params.id)} />} />
            <Route exact path="/calendars/:id" render={({ match }) => <Calendar notify={notify} calendar={calendarId(match.params.id)} />} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    ballrooms: state.ballrooms,
    schools: state.schools,
    videos: state.videos,
    calendars: state.calendars,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeBallrooms,
  initializeSchools,
  initializeVideos,
  initializeCalendars,
  initializeUsers,
  removeBallroom,
  removeSchool,
  removeVideo,
  removeCalendar,
  setMessage,
  setUser,
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)