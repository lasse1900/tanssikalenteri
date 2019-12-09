import React, { useState } from 'react'
import { connect } from 'react-redux'
import Comments from './Comments'
import { removeBallroom } from '../reducers/ballroomReducer'
import '../index.css'

const Ballroom = ({ ballroom, user, removeBallroom, notify }) => {
  const [hidden, setVisible] = useState(false)

  if (ballroom === undefined) return null

  const ballroomOwner = ballroom.author === user.username
  const buttonShow = { display: ballroomOwner ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!hidden)
  }

  if (!hidden) {
    return (<div className='ballroomStyle' onClick={toggleVisibility}>
      {ballroom.title} {ballroom.author}
    </div>)
  }

  const remove = async () => {
    if (window.confirm(`remove ballroom ${ballroom.title}? by ${ballroom.author}`)) {
      removeBallroom(ballroom)
      notify(`ballroom '${ballroom.title}' removed succesfully`, false)
    }
  }

  return (
    <div className='ballroomStyle'>
      <div className='toggle' onClick={toggleVisibility}>
        {ballroom.title}
        <br />
        <a href={ballroom.url}>{ballroom.url}</a><br></br>{ballroom.likes} - likes
        <br /> added by {ballroom.author}
        <br /> <button style={buttonShow} onClick={remove}>remove</button>
      </div>
      <Comments ballroom={ballroom} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    ballrooms: state.ballrooms
  }
}

const mapDispatchToProps = {
  removeBallroom: removeBallroom
}

const Connectedballroom = connect(mapStateToProps, mapDispatchToProps)(Ballroom)

export default Connectedballroom