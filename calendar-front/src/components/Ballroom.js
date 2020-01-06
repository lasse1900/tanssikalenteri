import React from 'react'
import { connect } from 'react-redux'
import '../index.css'
import Comments from './Comments'
import { likeBallroom, removeBallroom } from '../reducers/ballroomReducer'

const Ballroom = ({ ballroom, notify, removeBallroom }) => {

  if (ballroom === undefined) return null

  const remove = async () => {
    if (window.confirm(`remove ballroom ${ballroom.title}? by ${ballroom.author}`)) {
      removeBallroom(ballroom)
      notify(`ballroom '${ballroom.title}' removed succesfully`, false)
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

const mapStateToProps = state => {
  return {
    user: state.user,
    ballrooms: state.ballrooms,
    users: state.users
  }
}

const mapDispatchToProps = {
  likeBallroom: likeBallroom,
  removeBallroom: removeBallroom
}

const ConnectedBallroom = connect(mapStateToProps, mapDispatchToProps)(Ballroom)

export default ConnectedBallroom