import React from 'react'
import { connect } from 'react-redux'
import Comments from './CommentCalendar'
import { removeCalendar } from '../reducers/calendarReducer'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../index.css'

const Calendar = ({ calendar, notify, removeCalendar }) => {
  const history = useHistory()

  if (calendar === undefined) return null

  const remove = async () => {
    if (window.confirm(`remove calendar ${calendar.title}? by ${calendar.author}`)) {
      await removeCalendar(calendar)
      notify(`calendar '${calendar.title}' removed succesfully`, false)
      history.push('/calendars')
    }
  }

  return (
    <div className='ballroomStyle'>
      <div className='toggle' >
        {calendar.title}
        <br />
        <a href={calendar.url} target="_blank" rel="noopener noreferrer">{calendar.url} </a><br></br>
        <br /> <button onClick={remove}>remove</button>
      </div>
      <Comments calendar={calendar} />
    </div>
  )
}

Calendar.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.user,
    calendars: state.calendars,
    users: state.users
  }
}

const mapDispatchToProps = {
  removeCalendar: removeCalendar
}

const ConnectedCalendar = connect(mapStateToProps, mapDispatchToProps)(Calendar)

export default ConnectedCalendar