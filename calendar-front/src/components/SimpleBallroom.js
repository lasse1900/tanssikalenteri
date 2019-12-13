import React from 'react'

const SimpleBallroom = ({ ballroom, onClick }) => (
  <div>
    <div className='MyBallroom'>
      {ballroom.title} {ballroom.author}
    </div>
    <div className="Likes">
      ballroom has {ballroom.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBallroom