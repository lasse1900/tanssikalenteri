import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/ballroomReducer'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const Comment = props => {
  // if (props.ballroom.comments === undefined) return null

  const comment = useField('comment')
  const history = useHistory()

  const handleComment = () => {
    console.log('id: comment value:', props.ballroom.id, comment.value)
    props.addComment(props.ballroom.id, comment.value)
    history.push('/')
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  // const comments = props.ballroom.comments.map(c => <li key={c.id}>{c.comment}</li>)

  return (
    <div>
      <h3>comments</h3>
      <input id="commentInput"{ ...omitReset(comment)  } />
      <button id="addComment" onClick={handleComment}>add comment</button>
      {/*<ul>{comments}</ul> */}
    </div>
  )
}

Comment.propTypes = {
  // ballroom: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  addComment
}

const ConnectedComment = connect(null, mapDispatchToProps)(Comment)

export default ConnectedComment