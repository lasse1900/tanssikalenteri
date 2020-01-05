import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BallroomForm from './BallroomForm'
import { loginUser, setUser } from './../reducers/userReducer'
import '../index.css'

// const BallroomList = ({ notify, sortBallrooms }) => {
const BallroomList = (props, { ballroom }) => {

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

  return (
    <div> {ballroomForm()}
    {user.username}
    {props.ballrooms.map(ballroom => <div key={ballroom.id}> {ballroom.title} {ballroom.author}</div>)}
    </div>
  )

  // return (
  //   <div>
  //     {ballroomForm()}
  //     {props.sortBallrooms.map(ballroom =>
  //       <div className='ballroomStyle' key={ballroom.id}>
  //         <Link id="ballroomsList" to={`/ballrooms/${ballroom.id}`}>{ballroom.title}</Link>
  //       </div>
  //     )}
  //   </div>
  // )


}

const sortBallrooms = ballrooms => ballrooms.sort((a, b) => b.likes - a.likes)

// console.log('ballrooms:', sortBallrooms)
// console.log('user', {user})
// console.log('ballroom', ballroom.title)

const mapStateToProps = state => {
  return {
    ballrooms: state.ballrooms,
    sortBallrooms: sortBallrooms(state.ballrooms),
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps, { setUser })(BallroomList)