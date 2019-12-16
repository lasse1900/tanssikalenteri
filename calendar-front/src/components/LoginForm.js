import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
// import PropTypes from 'prop-types'
import loginService from '../services/login'
import { connect } from 'react-redux'
import { loginUser, setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
import '../app.css'

const LoginForm = (props, { setMessage }) => {
  const username = useField('username')
  const password = useField('password')
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      window.localStorage.setItem('loggedBallroomappUser', JSON.stringify(user))

      setUser(user)
      console.log('asetettu käyttäjä', user)
      username.reset('')
      password.reset('')
      props.history.push('/')
    } catch (exception) {
      setShowInfo(' username or password incorrect!')
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
        <input {...omitReset(username)} placeholder='username' />
        </div>
        <div>
          password
        <input {...omitReset(password)} placeholder='password' />
        </div>
        <button type="submit">login</button>
        {showInfo}
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  // username: PropTypes.object.isRequired,
  // password: PropTypes.object.isRequired
}

export default connect(null, { loginUser, setMessage })(withRouter(LoginForm))