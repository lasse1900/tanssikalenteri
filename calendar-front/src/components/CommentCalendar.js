import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/calendarReducer'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const Comment = props => {
  if (props.calendar.comments === undefined) return null

  const comment = useField('comment')

  const handleComment = () => {
    props.addComment(props.calendar.id, comment.value)
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  const comments = props.calendar.comments.map(c => <li key={c.id}>{c.comment}</li>)

  return (
    <div>
      <h3>comments</h3>
      <input id="commentInput"{...omitReset(comment)} />
      <Button className="ui basic tiny button" id="addComment" onClick={handleComment}>add comment</Button>
      <ul>{comments}</ul>
    </div>
  )
}

Comment.propTypes = {
  calendar: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  addComment
}

const ConnectedComment = connect(null, mapDispatchToProps)(Comment)

export default ConnectedComment