import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, NavLink, Switch, Redirect, withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
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
import LinksPage from './components/LinksPage'
import { initializeUsers } from './reducers/userReducer'
import Ballroom from './components/Ballroom'
import School from './components/School'
import Video from './components/Video'
import { Container } from 'semantic-ui-react'
import NotFoundPage from './components/NotFoundPage'
import { getCurrentDate } from './utils/currentDate'

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

  const [loggedOut, setLoggedOut] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setTokens(user)
    } else {
      setLoggedOut(true)
      handleRedirect()
    }
  }, [])

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
  }, [user])

  useEffect(() => {
    if (user) {
      history.push('/ballrooms')
    }
  }, [user])

  const setTokens = (user) => {
    ballroomService.setToken(user.token)
    schoolService.setToken(user.token)
    videoService.setToken(user.token)
    calendarService.setToken(user.token)
  }

  const handleRedirect = () => {
    if (loggedOut) {
      return (
        <Redirect to="/login" />
      )
    }
  }

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
    setLoggedOut(true)
  }

  if (user === null) {
    return (
      <Container>
        <div>
          <Route path="/login" render={() => <LoginForm notify={notify} />} />
          <Route path="/register" render={() => <RegisterForm notify={notify} />} />
        </div>
      </Container>)
  }

  return (
    <Container>
      <div>
        <div className='ui vertical fluid menu'>
          <NavLink to="/home" data-cy="home" className="Nav_link" activeClassName="activeRoute" activeStyle={{ color: 'red' }} > about{'  '} </NavLink>
          <NavLink to="/links" data-cy="links" className="Nav_link" activeClassName="activeRoute" activeStyle={{ color: 'red' }} > links{'  '} </NavLink>
          <NavLink to="/ballrooms" data-cy="ballrooms" className="Nav_link" activeClassName="activeRoute" activeStyle={{ color: 'red' }} > ballrooms{'  '} </NavLink>
          <NavLink to="/schools" data-cy="schools" className="Nav_link" activeClassName="activeRoute" activeStyle={{ color: 'red' }} > schools{'  '} </NavLink>
          <NavLink to="/videos" data-cy="vidoes" className="Nav_link" activeClassName="activeRoute" activeStyle={{ color: 'red' }} > videos{'  '} </NavLink>
          <NavLink to="/calendars" data-cy="calendars" className="Nav_link" activeClassName="activeRoute" activeStyle={{ color: 'red' }} > calendars{'  '} </NavLink>
          {' <'}{user.username}> logged in {' - '}Date: {getCurrentDate()}{' - '}
          <button className="ui mini button" data-cy="logout" onClick={handleLogout}>logout</button>
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
          <Route exact path="/home" render={({ match }) => <AboutPage path={match.path} />} />
          <Route exact path="/links" render={({ match }) => <LinksPage path={match.path} />} />
          <Route exact path="/ballrooms/:id" render={({ match }) => <Ballroom notify={notify} ballroom={ballroomId(match.params.id)} />} />
          <Route exact path="/schools/:id" render={({ match }) => <School notify={notify} school={schoolId(match.params.id)} />} />
          <Route exact path="/videos/:id" render={({ match }) => <Video notify={notify} video={videoId(match.params.id)} />} />
          <Route exact path="/calendars/:id" render={({ match }) => <Calendar notify={notify} calendar={calendarId(match.params.id)} />} />
          <Route component={NotFoundPage} />
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))