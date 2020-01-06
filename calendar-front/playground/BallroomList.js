import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BallroomForm from './BallroomForm'
import { setUser } from './../reducers/userReducer'
import '../index.css'

// const BallroomList = ({ notify, sortBallrooms }) => {
const BallroomList = (props) => {

  const [user, setUser] = useState('')
  const [myFavourite, setMyFavourite] = useState('')

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

  // return (
  //   <div> {ballroomForm()}
  //   {user.username}
  //   {props.ballrooms.map(ballroom => <div key={ballroom.id}> {ballroom.title} {ballroom.author}</div>)}
  //   </div>
  // )

  let myBallrooms = props.ballrooms.filter(function (ballroom) {
    return ballroom.author === user.username
  })

  let myBallrooms2 = myBallrooms.map(function (ballroom) {
    return ballroom.title + ' url: ' + ballroom.url
  })

  let sortBallrooms = props.ballrooms.filter(function(ballroom){
    return ballroom.author === user.username
  })

  console.log('myBallrooms2', myBallrooms2)

  useEffect(() => {
    setMyFavourite(myBallrooms2)
    console.log('--->', myFavourite.title)
  }, [])

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



// let myBallrooms = props.ballrooms.filter(function (ballroom) {
//   return ballroom.author === user.username
// })

// const sortBallrooms = ballrooms => ballrooms.sort((a, b) => b.likes - a.likes)
// const sortBallrooms = ballrooms => ballrooms.filter()


// console.log('sorted ballrooms:', sortBallrooms)
// console.log('user', {user})
// console.log('ballroom', ballroom.title)

const mapStateToProps = state => {
  return {
    ballrooms: state.ballrooms,
    // sortBallrooms: sortBallrooms(state.ballrooms),
    user: state.user,
    users: state.users,
    // myBallrooms2: sortBallrooms(state.ballrooms)
  }
}

export default connect(mapStateToProps, { setUser })(BallroomList)