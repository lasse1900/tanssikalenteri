import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { createVideo } from '../reducers/videoReducer'
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const VideoForm = props => {

  const author = useField('author')
  const title = useField('title')
  const url = useField('url')

  const handleVideoCreation = async (event) => {
    event.preventDefault()
    const videoObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      await props.createVideo(videoObject)
      title.reset()
      author.reset()
      url.reset()
      props.notify(`a new dancevideo '${videoObject.title}' successfully added`)
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
        <Form onSubmit={event => handleVideoCreation(event)}>
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

VideoForm.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.user,
    video: state.video,
    users: state.users
  }
}

const mapDispatchToProps = {
  createVideo
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm)