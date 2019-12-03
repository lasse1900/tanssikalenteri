import React from 'react'
import PropTypes from 'prop-types'

const RegisterForm = ({ handleSubmit, username, password }) => {

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

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

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default RegisterForm