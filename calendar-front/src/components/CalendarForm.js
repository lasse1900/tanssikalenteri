import React, { useState } from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { createCalendar } from '../reducers/calendarReducer'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'semantic-ui-react'

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
      <Togglable data-cy="togglable-add-calendarMark" buttonLabel='add'>
        <div>
          <Form onSubmit={event => handleCalendarCreation(event)}>
            <Form.Field>
              <label>title</label>
              <Input data-cy="calendar-title" type="text" {...omitReset(title)} />
            </Form.Field>
            <Form.Field>
              <label>url</label>
              <Input data-cy="calendar-url" type="url" {...omitReset(url)} />
            </Form.Field>
            <Form.Field>
              <label>Please give date:</label>
              <DayPickerInput data-cy="date-input" onDayChange={day => setPvm(day)} />
            </Form.Field>
            <Button data-cy="togglable-add-calendar"  className="ui basic tiny button" type='submit'>add</Button>
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