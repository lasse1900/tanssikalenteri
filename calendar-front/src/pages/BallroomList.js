import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BallroomForm from './BallroomForm'
import '../index.css'

const BallroomList = ({ notify, sortBallrooms }) => {

  const ballroomForm = () => (
    <BallroomForm
      notify={notify}
    />
  )

  return (
    <div>
      {ballroomForm()}
      ballrooms
    </div>
  )

}

const mapStateToPros = state => {
  return {
    ballrooms: state.ballrooms,
  }
}

const ConnectedBallroomList = connect(mapStateToPros)(BallroomList)

export default ConnectedBallroomList