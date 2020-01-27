import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { loginUser, setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
import userService from '../services/users'
import { Button, Input } from 'semantic-ui-react'
// import '../login.css'

const RegisterForm = (props) => {

  const username = useField('username')
  const password = useField('password')
  const PASSWORD = useField('PASSWORD')
  const usernameRef = useRef()
  const passwordRef = useRef()
  const rPasswordRef = useRef()
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
    }
  }, [])

  function keyPressHandle(e) {
    if (e.keyCode === 13) {
      if (e.target.id === "username") {
        passwordRef.current.focus()
      }
      if (e.target.id === "password") {
        rPasswordRef.current.focus()
      }
    }
  }

  const createUser = async (event) => {
    event.preventDefault()
    if (password.value !== PASSWORD.value) {
      setShowInfo(' please re-enter password!')
      password.reset()
      PASSWORD.reset()
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
      PASSWORD.reset()
      props.notify('user created [from registerForm]', false)
      props.history.push('/registerInfo')
    } catch (exception) {
      setShowInfo(' Username already taken OR invalid. Please try again!')
      props.notify(`${exception.response.data}`, true)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  return (
    <div>
      <br></br>
      <h2>Register</h2>
      <form onSubmit={createUser} >
        <div>
          username
          <Input ref={usernameRef} id="username" {...omitReset(username)} placeholder='username' onKeyDown={keyPressHandle} />
        </div>
        <div>
          password
          <Input ref={passwordRef} {...omitReset(password)} placeholder='password' onKeyDown={keyPressHandle} />
        </div>
        <div>
          retype password
          <Input ref={rPasswordRef} {...omitReset(PASSWORD)} placeholder='retype password' onKeyDown={keyPressHandle} />
        </div>
        <Button className="ui basic tiny button" type="submit">register</Button>
        {showInfo}
      </form>
    </div>
  )
}

RegisterForm.propTypes = {
  notify: PropTypes.func.isRequired
}

export default connect(null, { loginUser, setUser, setMessage })(withRouter(RegisterForm))