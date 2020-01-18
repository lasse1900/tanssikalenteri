import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { createCalendar } from '../reducers/calendarReducer'
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'

const CalendarForm = props => {

  const author = useField('author')
  const title = useField('title')
  const url = useField('url')
  const date = useField('date')

  const handleCalendarCreation = async (event) => {
    event.preventDefault()
    const calendarObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      date: date.value
    }

    try {
      await props.createCalendar(calendarObject)
      title.reset()
      author.reset()
      url.reset()
      date.reset()
      props.notify(`a new dancecalendar '${calendarObject.title}' successfully added`)
    } catch (exception) {
      // props.notify(`${exception.response.data.error}`, true)
      props.notify(`${exception}`, true)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  return (
    <Togglable buttonLabel='add'>
      <div>
        <Form onSubmit={event => handleCalendarCreation(event)}>
          <Form.Field>
            <label>title</label>
            <input id="title" data-cy="title" {...omitReset(title)} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input id="author" data-cy="author" {...omitReset(author)} />
          </Form.Field>
          <Form.Field>
            <label>url</label>
            <input id="url" data-cy="url" {...omitReset(url)} />
          </Form.Field>
          <Form.Field>
          <label>Please give date:</label>
          <DayPickerInput id="date" data-cy="date"
          
          {...omitReset(date)} defaultValue={value} value={undefined} onDayChange={(day) => date.onChange({ target: { value: day }})}
          
          
          />
          </Form.Field>
          <button type='submit' data-cy="Add">Add</button>
        </Form>
      </div>
    </Togglable>
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