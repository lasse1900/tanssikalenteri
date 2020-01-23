import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import loginService from '../services/login'
import { loginUser, setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
import ballroomService from '../services/ballrooms'
import schoolService from '../services/schools'
import videoService from '../services/videos'
import calendarService from '../services/calendars'
import PropTypes from 'prop-types'
import '../login.css'

const LoginForm = (props) => {
  const username = useField('username')
  const password = useField('password')
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      const user = await loginService.login(
        credentials
      )
      window.localStorage.setItem('loggedBallroomAppUser', JSON.stringify(user))
      props.setUser(user)
      props.notify('login succeeded', false)
      ballroomService.setToken(user.token)
      schoolService.setToken(user.token)
      videoService.setToken(user.token)
      calendarService.setToken(user.token)
      props.history.push('/')
    } catch (exception) {
      setShowInfo(' username or password incorrect!')
      props.notify(`${exception.response.data}`, true)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} >
        <div>
          username
        <input id="username" {...omitReset(username)} placeholder='username' />
        </div>
        <div>
          password
        <input id="password" {...omitReset(password)} placeholder='password' />
        </div>
        <button type="submit">login</button>
        {showInfo}
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  setMessage,
  loginUser,
  setUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))