import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'

const App = (props) => {
  const username = useField('username')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
      // console.log('credentials', credentials)
      const user = await loginService.login(
        credentials
      )
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
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

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    // notify(`${user.username} logged out`, false)
    setUser(null)
  }

  if (user) {
    return (
      <div>
        <h2>Tanssipaikat</h2>

        <p>{`Logged in as ${user.name}`}</p>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
    )
  }

  return (
    <div>

      <LoginForm className='loginform'
        username={omitReset(username)}
        password={omitReset(password)}

        handleSubmit={handleLogin}
      />
    </div>

  )
}

export default App;