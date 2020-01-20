import React from 'react'
import { connect } from 'react-redux'
import Comments from './CommentCalendar'
import { removeCalendar } from '../reducers/calendarReducer'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../index.css'

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'

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

  console.log('calendar.date :', calendar.date)
  const dateFromDB = new Date(calendar.date)
  console.log('dateFromDB', dateFromDB)

  const modifiers = {
    highlighted: dateFromDB
  };

  const birthdayStyle = `.DayPicker-Day--highlighted {
    background-color: blue;
    color: white;
  }`;

  return (
    <div className='ballroomStyle'>
      <div className='toggle' >
        {calendar.title}
        <br></br><br></br>
        <a href={calendar.url} target="_blank" rel="noopener noreferrer">{calendar.url} </a><br></br>
        <div>
          <style>{birthdayStyle}</style>
         <DayPicker modifiers={modifiers} month={dateFromDB} />
        </div>
      </div>
      <Comments calendar={calendar} />
      <br /> <button onClick={remove}>remove</button>
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