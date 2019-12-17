import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
// import PropTypes from 'prop-types'
// import loginService from '../services/login'
import userService from '../services/users'
import { connect } from 'react-redux'
import { loginUser, setUser, logoutUser } from '../reducers/userReducer'
import '../app.css'

const RegisterForm = (props) => {

  const username = useField('username')
  const password = useField('password')
  const rPassword = useField('rPassword')
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const createUser = async (event) => {
    event.preventDefault()
    if (password.value !== rPassword.value) {
      setShowInfo(' please re-enter password!')
      password.reset()
      rPassword.reset()
      return
    }

    try {
      console.log('username:', username.value)
      console.log('password:', password.value)

      const user = {
        username: username.value,
        name: username.value,
        password: password.value
      }

      await userService.post('/api/users', user)

      username.reset()
      password.reset()
      rPassword.reset()
      console.log('user created', username)
      props.history.push('/')
    } catch (error) {
      console.log('Something went wrong. Please try again.', error)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={createUser} >
        <div>
          username
        <input {...omitReset(username)} placeholder='username' />
        </div>
        <div>
          password
        <input {...omitReset(password)} placeholder='password' />
        </div>
        <div>
          retype password
        <input {...omitReset(rPassword)} placeholder='retype password' />
        </div>
        <button type="submit">register</button>
        {showInfo}
      </form>
    </div>
  )
}

RegisterForm.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  // username: PropTypes.object.isRequired,
  // password: PropTypes.object.isRequired
}

export default connect(null, { loginUser, logoutUser })(withRouter(RegisterForm))