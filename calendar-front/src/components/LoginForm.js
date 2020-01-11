import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import loginService from '../services/login'
import { loginUser, setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
import ballroomService from '../services/ballrooms'
import PropTypes from 'prop-types'
import '../app.css'

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

    console.log('username', username.value)

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      console.log('credentials', credentials)
      const user = await loginService.login(
        credentials
      )
      window.localStorage.setItem('loggedBallroomAppUser', JSON.stringify(user))
      props.setUser(user)
      props.notify('login succeeded', false)
      console.log(`LoginForm.js - asetettu käyttäjä: ${user.name} tokenilla: ${user.token}`)
      ballroomService.setToken(user.token)
      props.history.push('/')
    } catch (exception) {
      setShowInfo(' username or password incorrect!')
      props.notify('login not succeeded', false)
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
  handleLogin: PropTypes.object.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
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