import React, { useState, useEffect } from 'react'
import { useField } from '../hooks'
import loginService from '../services/login'
import { connect } from 'react-redux'
import { loginUser, setUser, logoutUser } from '../reducers/userReducer'

const RegisterForm = (props) => {

  const username = useField('username')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

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
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
    }

  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    // console.log('hookWitoutReset', JSON.stringify(hookWithoutReset))
    return hookWithoutReset
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin} >
          <div>
            username
        <input {...username} />
          </div>

          <div>
            password
        <input {...password} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  if (user)
    return (
      <div></div>
    // <div>
    //   {window.location.href = '/ballroom'}
    // </div>
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

export default ConnectedRegisterForm

// <button type="submit" onClick={handleLogin}>register</button>
// <button type="submit" onClick={event => window.location.href = '/'}>register</button>