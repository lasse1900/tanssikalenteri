import React, { useState } from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { createCalendar } from '../reducers/calendarReducer'
import { Form } from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'

const CalendarForm = props => {

  const title = useField('title')
  const url = useField('url')
  const [pvm, setPvm] = useState('date')

  const handleCalendarCreation = async (event) => {
    event.preventDefault()
    const calendarObject = {
      title: title.value,
      author: props.user.name,
      url: url.value,
      date: pvm
    }

    try {
      await props.createCalendar(calendarObject)
      title.reset()
      url.reset()
      props.notify(`a new dancecalendar '${calendarObject.title}' successfully added`)
    } catch (exception) {
      props.notify(`${exception.response.data.error}`, true)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  return (
    <div>
      <br></br>
      <Togglable buttonLabel='add'>
        <div>
          <Form onSubmit={event => handleCalendarCreation(event)}>
            <Form.Field>
              <label>title</label>
              <input id="title" data-cy="title" {...omitReset(title)} />
            </Form.Field>
            <Form.Field>
              <label>url</label>
              <input id="url" data-cy="url" {...omitReset(url)} />
            </Form.Field>
            <Form.Field>
              <label>Please give date:</label>
              <DayPickerInput onDayChange={day => setPvm(day)} />
            </Form.Field>
            <button type='submit' data-cy="Add">Add</button>
          </Form>
        </div>
      </Togglable>
    </div>

  )
}

CalendarForm.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.user,
    calendar: state.calendar,
    users: state.users
  }
}

const mapDispatchToProps = {
  createCalendar
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarForm)