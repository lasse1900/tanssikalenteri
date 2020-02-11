import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import loginService from '../services/login'
import { loginUser, setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
import ballroomService from '../services/ballrooms'
import schoolService from '../services/schools'
import videoService from '../services/videos'
import calendarService from '../services/calendars'
import PropTypes from 'prop-types'
import { Form, Button, Image, Input } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import tango from '../pics/argentine-tango_primary.jpg'

const LoginForm = (props) => {
  const username = useField('username')
  const password = useField('password')
  const usernameRef = useRef()
  const passwordRef = useRef()
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
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      const user = await loginService.login(
        credentials
      )
      window.localStorage.setItem('loggedBallroomAppUser', JSON.stringify(user))
      props.setUser(user)
      // props.notify('login succeeded', false)
      ballroomService.setToken(user.token)
      schoolService.setToken(user.token)
      videoService.setToken(user.token)
      calendarService.setToken(user.token)
      props.history.push('/home')
    } catch (exception) {
      setShowInfo(' username or password incorrect!')
      props.notify(`${exception.response.data}`, true)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  const goToRegisterPage = () => {
    history.push('/register')
  }

  return (
    <div>
      <br></br>
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui blue image header">
            <div className="content">
              <i>Dance Calendar App - Login</i>
            </div>
          </h2>
          <Form className="ui large form" onSubmit={handleLogin}>
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
              <div className="ui fluid large blue submit button">
                <Button className="ui fluid large blue submit button" type="submit" data-cy="login">login</Button>
                {showInfo}
              </div>
            </div>
            <div className="ui error message"></div>
          </Form>
          <div className="ui message">
            <span>New to us?{' '}</span>
            <Button data-cy="to-registerForm" className="ui basic tiny button" type='submit' onClick={goToRegisterPage} >to Register Page</Button>
          </div>
        </div>
      </div>
      <div className="ui middle aligned center aligned grid">
        <Image src={tango} />
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  notify: PropTypes.func.isRequired,
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