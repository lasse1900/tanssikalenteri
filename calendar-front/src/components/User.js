import React from 'react'
import { connect } from 'react-redux'

const User = props => {
  if (props.user === undefined) return null

  return (
    <div>
      <h2>{props.user.name}</h2>
      <h4>added ballrooms:</h4>
      <ul>
        {
          props.user.ballrooms.map(ballroom => <li key={ballroom.id}>{ballroom.title}</li>)
        }
      </ul>
    </div>
  )
}

const ConnectedUser = connect()(User)

export default ConnectedUser