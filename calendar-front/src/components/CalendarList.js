import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CalendarForm from './CalendarForm'
import { setUser } from './../reducers/userReducer'

const CalendarList = (props) => {

  const [user, setUser] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const userNew = JSON.parse(loggedUserJSON)
      setUser(userNew)
    }
  }, [])

  const calendarForm = () => (
    <CalendarForm
      notify={props.notify}
    />
  )

  let userCalendars = props.calendars.filter(function (calendar) {
    return calendar.author === user.username
  })

  return (
    <div> {calendarForm()}
      <br></br>
      {userCalendars.map(calendar =>
        <div key={calendar.id}>
          <Link id="calendarsList" to={`/calendars/${calendar.id}`}>{calendar.title}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    calendars: state.calendars,
    user: state.user,
    users: state.users,
  }
}

export default connect(mapStateToProps, { setUser })(CalendarList)