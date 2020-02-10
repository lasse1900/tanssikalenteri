import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { loginUser, setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
import userService from '../services/users'
import { Form, Button, Image, Input } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import tango from '../pics/argentine-tango_primary.jpg'

const RegisterForm = (props) => {

  const username = useField('username')
  const password = useField('password')
  const PASSWORD = useField('PASSWORD')
  const usernameRef = useRef()
  const passwordRef = useRef()
  const rPasswordRef = useRef()
  const [showInfo, setShowInfo] = useState(false)
  const history = useHistory()

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
      // props.history.push('/registerInfo') - left for possible future use
      console.log('username created', username)
      props.history.push('/login')
    } catch (exception) {
      setShowInfo(' Username already taken OR invalid. Please try again!')
      props.notify(`${exception.response.data}`, true)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  const goToLoginPage = () => {
    history.push('/login')
  }

  return (
    <div>
      <br></br>
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui blue image header">
            <div className="content">
              <i>Dance Calendar App - Register</i>
            </div>
          </h2>
          <Form className="ui large form" onSubmit={createUser}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <Input ref={usernameRef} id="username" type="text" data-cy="username" {...omitReset(username)}
                    placeholder='Username / E-mail address - (minlength 5)' onKeyDown={keyPressHandle} />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <Input ref={passwordRef} id="password" type="password" name="password" data-cy="password" {...omitReset(password)}
                    placeholder='Password - (minlength 6)' />
                </div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <Input ref={rPasswordRef} id="password" type="password" name="rPassword" data-cy="rPassword" {...omitReset(PASSWORD)}
                    placeholder='Password - (minlength 6)' />
                </div>
              </div>

              <div className="ui fluid large blue submit button">
                <Button className="ui fluid large blue submit button" type="submit" data-cy="register">register</Button>
                {showInfo}
              </div>
            </div>
            <div className="ui error message"></div>
          </Form>
          <div className="ui message">
            <span>Allready a user?{' '}</span>
            <Button data-cy="to-registerForm" className="ui basic tiny button" type='submit' onClick={goToLoginPage} >to Login Page</Button>
          </div>
        </div>
      </div>
      <div className="ui middle aligned center aligned grid">
        <Image src={tango} />
      </div>
    </div>
  )
}

RegisterForm.propTypes = {
  notify: PropTypes.func.isRequired
}

export default connect(null, { loginUser, setUser, setMessage })(withRouter(RegisterForm))