import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
// import PropTypes from 'prop-types'
import loginService from '../services/login'
import { loginUser, setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
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
      console.log('asetettu käyttäjä', user)
      // username.reset(''); password.reset('')  
      // Causes a warning: index.js:1437 Warning: Can't perform a React state update on an unmounted component
      props.history.push('/')
    } catch (exception) {
      setShowInfo(' username or password incorrect!')
      // console.log('virhe', exception)
      props.notify('login not succeeded', false)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    // console.log('hookWitoutReset', JSON.stringify(hookWithoutReset))
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
  // handleLogin: PropTypes.object.isRequired,
  // username: PropTypes.object.isRequired,
  // password: PropTypes.object.isRequired
}

export default connect(null, { loginUser, setUser, setMessage })(withRouter(LoginForm))