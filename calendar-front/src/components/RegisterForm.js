import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
// import PropTypes from 'prop-types'
import loginService from '../services/login'
import { connect } from 'react-redux'
import { loginUser, setUser, logoutUser } from '../reducers/userReducer'
import '../app.css'

const RegisterForm = (props) => {

  const username = useField('username')
  const password = useField('password')
  const rPassword = useField('rPassword')
  const [user, setUser] = useState(null)

  // const [username, resetUsername] = useField('text')
  // const [password, resetPassword] = useField('password')
  // const [rPassword, resetRPassword] = useField('password')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const createUser = async (event) => {
    event.preventDefault()
    console.log('createUser')
    if (password.value !== rPassword.value) {
      props.notify('Please re-enter passwords!', 3)
      password.reset()
      rPassword.reset()
      return
    }
    try {
      console.log('username', username.value)
      console.log('password', password.value)
      const user = {
        username: username.value,
        password: password.value,
      }

      await loginService.post('/api/users', user)

      username.reset()
      password.reset()
      rPassword.reset()

      props.notify(`User ${user.username} created. You may now log in.`, 3)
      props.history.push('/')
    } catch (error) {
      props.notify('Something went wrong. Please try again.')
    }
  }

  // const omitReset = (hook) => {
  //   let { reset, ...hookWithoutReset } = hook
  //   // console.log('hookWitoutReset', JSON.stringify(hookWithoutReset))
  //   return hookWithoutReset
  // }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={createUser} >
        <div>
          username
        <input {...username} placeholder='username'/>
        </div>
        <div>
          password
        <input {...password} placeholder='password'/>
        </div>
        <div>
          retype password
      <input {...rPassword} placeholder='retype password'/>
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  )
}

RegisterForm.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  // username: PropTypes.object.isRequired,
  // password: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    ballrooms: state.ballrooms,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  loginUser,
  setUser,
  logoutUser
}

const ConnectedRegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm)

export default withRouter(ConnectedRegisterForm)