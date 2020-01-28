import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { loginUser, setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
import userService from '../services/users'
import { Form, Button, Input } from 'semantic-ui-react'

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
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui blue image header">
            {/*<img src="assets/images/logo.png" className="image" /> */}
            <div className="content">
              Register
        </div>
          </h2>
          <Form className="ui large form" onSubmit={createUser}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <Input ref={usernameRef} id="username" type="text" {...omitReset(username)} placeholder='Username / E-mail address' onKeyDown={keyPressHandle} />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <Input ref={passwordRef} id="password" type="password" name="password" {...omitReset(password)} placeholder='Password' />
                </div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <Input ref={rPasswordRef} id="password" type="password" name="rPassword" {...omitReset(PASSWORD)} placeholder='Password' />
                </div>
              </div>

              <div className="ui fluid large blue submit button">
                <Button className="ui fluid large blue submit button" type="submit">register</Button>
                {showInfo}
              </div>
            </div>
            <div className="ui error message"></div>
          </Form>
          <div className="ui message">
            New to us? <a href='/login'>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  )
}

RegisterForm.propTypes = {
  notify: PropTypes.func.isRequired
}

export default connect(null, { loginUser, setUser, setMessage })(withRouter(RegisterForm))