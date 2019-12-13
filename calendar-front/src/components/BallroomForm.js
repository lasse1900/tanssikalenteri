import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { createBallroom } from '../reducers/ballroomReducer'
import { Form } from 'semantic-ui-react'

const BallroomForm = props => {

  const author = useField('author')
  const title = useField('title')
  const url = useField('url')

  const handleBallroomCreation = async event => {
    event.preventDefault()
    const ballroomObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      props.createBallroom(ballroomObject)
      title.reset()
      author.reset()
      url.reset()
      props.notify(`a new ballroom '${ballroomObject.title}' successfully added`)
    } catch (exception) {
      props.notify(`${exception.response.data.error}`, true)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  return (
    <Togglable buttonLabel='add'>
      <div>
        <Form onSubmit={event => handleBallroomCreation(event)}>
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
BallroomForm.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  createBallroom
}

const ConnectedBallroomForm = connect(null, mapDispatchToProps)(BallroomForm)

export default ConnectedBallroomForm