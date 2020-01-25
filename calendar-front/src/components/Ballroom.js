import React from 'react'
import { connect } from 'react-redux'
import Comments from './CommentBallroom'
import { removeBallroom } from '../reducers/ballroomReducer'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../index.css'

const Ballroom = ({ ballroom, notify, removeBallroom }) => {
  const history = useHistory()

  if (ballroom === undefined) return null

  const remove = async () => {
    if (window.confirm(`remove ballroom ${ballroom.title}? by ${ballroom.author}`)) {
      await removeBallroom(ballroom)
      notify(`ballroom '${ballroom.title}' removed succesfully`, false)
      history.push('/ballrooms')
    }
  }

  return (
    <div className='ballroomStyle'>
      <div className='toggle' >
        {ballroom.title}
        <br />
        <a href={ballroom.url} target="_blank" rel="noopener noreferrer">{ballroom.url} </a><br></br>
        <br /> <button onClick={remove}>remove</button>
      </div>
      <Comments ballroom={ballroom} />
    </div>
  )
}

Ballroom.propTypes = {
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
  removeBallroom: removeBallroom
}

const ConnectedBallroom = connect(mapStateToProps, mapDispatchToProps)(Ballroom)

export default ConnectedBallroom