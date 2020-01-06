import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BallroomForm from './BallroomForm'
import { setUser } from './../reducers/userReducer'
import '../index.css'

const BallroomList = (props) => {

  const [user, setUser] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomappUser')
    if (loggedUserJSON) {
      const userNew = JSON.parse(loggedUserJSON)
      console.log('user:', user.name)
      setUser(userNew)
    }
  }, [])

  const ballroomForm = () => (
    <BallroomForm
      notify={props.notify}
    />
  )


  let sortBallrooms = props.ballrooms.filter(function (ballroom) {
    return ballroom.author === user.username
  })

  return (
    <div> {ballroomForm()}
      {user.username}
      {sortBallrooms.map(ballroom =>
        <div className='ballroomStyle' key={ballroom.id}>
          <Link id="ballroomsList" to={`/ballrooms/${ballroom.id}`}>{ballroom.title}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ballrooms: state.ballrooms,
    user: state.user,
    users: state.users,
  }
}

export default connect(mapStateToProps, { setUser })(BallroomList)