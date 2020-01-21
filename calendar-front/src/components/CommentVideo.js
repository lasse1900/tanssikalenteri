import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/videoReducer'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

const Comment = props => {
  if (props.video.comments === undefined) return null

  const comment = useField('comment')

  const handleComment = () => {
    props.addComment(props.video.id, comment.value)
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  const comments = props.video.comments.map(c => <li key={c.id}>{c.comment}</li>)

  return (
    <div>
      <h3>comments</h3>
      <input id="commentInput"{...omitReset(comment)} />
      <button id="addComment" onClick={handleComment}>add comment</button>
      <ul>{comments}</ul>
    </div>
  )
}

Comment.propTypes = {
  video: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  addComment
}

const ConnectedComment = connect(null, mapDispatchToProps)(Comment)

export default ConnectedComment