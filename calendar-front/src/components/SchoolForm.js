import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { createSchool } from '../reducers/schoolReducer'
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const SchoolForm = props => {

  const title = useField('title')
  const url = useField('url')

  const handleSchoolCreation = async (event) => {
    event.preventDefault()
    const schoolObject = {
      title: title.value,
      author: props.user.name,
      url: url.value
    }

    try {
      await props.createSchool(schoolObject)
      title.reset()
      url.reset()
      props.notify(`a new danceschool '${schoolObject.title}' successfully added`)
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
          <Form onSubmit={event => handleSchoolCreation(event)}>
            <Form.Field>
              <label>title</label>
              <input id="title" data-cy="title" {...omitReset(title)} />
            </Form.Field>
            <Form.Field>
              <label>url</label>
              <input id="url" data-cy="url" {...omitReset(url)} />
            </Form.Field>
            <button type='submit' data-cy="Add">Add</button>
          </Form>
        </div>
      </Togglable>
    </div>

  )
}

SchoolForm.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.user,
    school: state.school,
    users: state.users
  }
}

const mapDispatchToProps = {
  createSchool
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolForm)