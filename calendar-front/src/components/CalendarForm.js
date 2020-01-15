import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { createCalendar } from '../reducers/calendarReducer'
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const CalendarForm = props => {

  const author = useField('author')
  const title = useField('title')
  const url = useField('url')

  const handleCalendarCreation = async (event) => {
    event.preventDefault()
    const calendarObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      await props.createCalendar(calendarObject)
      title.reset()
      author.reset()
      url.reset()
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