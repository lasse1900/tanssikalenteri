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
      {sortBallrooms.map(ballroom =>
        <div className='ballroomStyle' key={ballroom.id}>
          <Link id="ballroomsList" to={`/ballrooms/${ballroom.id}`}>{ballroom.title}</Link>
        </div>
      )}
    </div>
  )

}

const sortBallrooms = ballrooms => ballrooms.sort((a, b) => b.likes - a.likes)

const mapStateToPros = state => {
  return {
    ballrooms: state.ballrooms,
    sortBallrooms: sortBallrooms(state.ballrooms)
  }
}

const ConnectedBallroomList = connect(mapStateToPros)(BallroomList)

export default ConnectedBallroomList