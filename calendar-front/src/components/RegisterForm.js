import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { loginUser, setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
import userService from '../services/users'
import '../app.css'

const RegisterForm = (props) => {

  const username = useField('username')
  const password = useField('password')
  const rPassword = useField('rPassword')
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
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
      const user = {
        username: username.value,
        name: username.value,
        password: password.value
      }

      await userService.post('/api/users', user)

      username.reset()
      password.reset()
      rPassword.reset()
      props.notify('user created [from registerForm]', false)
      props.history.push('/registerInfo')
    } catch (error) {
      setShowInfo(' Username already taken. Please try again!')
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
  notify: PropTypes.func.isRequired
}

export default connect(null, { loginUser, setUser, setMessage })(withRouter(RegisterForm))