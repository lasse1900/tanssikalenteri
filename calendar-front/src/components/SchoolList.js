import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SchoolForm from './SchoolForm'
import { setUser } from './../reducers/userReducer'

const SchoolList = (props) => {

  const [user, setUser] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const userNew = JSON.parse(loggedUserJSON)
      setUser(userNew)
    }
  }, [])

  const schoolForm = () => (
    <SchoolForm
      notify={props.notify}
    />
  )

  let userSchools = props.schools.filter(function (school) {
    return school.author === user.username
  })

  return (
    <div> {schoolForm()}
      <br></br>
      {userSchools.map(school =>
        <div key={school.id}>
          <Link id="schoolsList" to={`/schools/${school.id}`}>{school.title}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    schools: state.schools,
    user: state.user,
    users: state.users,
  }
}

export default connect(mapStateToProps, { setUser })(SchoolList)