import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { createBallroom } from '../reducers/ballroomReducer'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'semantic-ui-react'

const BallroomForm = props => {

  const title = useField('title')
  const url = useField('url')

  const handleBallroomCreation = async (event) => {
    event.preventDefault()
    const ballroomObject = {
      title: title.value,
      author: props.user.name,
      url: url.value
    }

    try {
      await props.createBallroom(ballroomObject)
      title.reset()
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
    <div>
      <br></br>
      <Togglable buttonLabel='add'>
        <div>
          <Form onSubmit={event => handleBallroomCreation(event)}>
            <Form.Field>
              <label>title</label>
              <Input id="title" data-cy="title" {...omitReset(title)} />
            </Form.Field>
            <Form.Field>
              <label>url</label>
              <Input id="url" data-cy="url" {...omitReset(url)} />
            </Form.Field>
            <Button className="ui basic tiny button" type='submit' data-cy="Add">Add</Button>
          </Form>
        </div>
      </Togglable>
    </div>
  )
}

BallroomForm.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.user,
    ballrooms: state.ballrooms,
    users: state.users
  }
}

const mapDispatchToProps = {
  createBallroom
}

export default connect(mapStateToProps, mapDispatchToProps)(BallroomForm)