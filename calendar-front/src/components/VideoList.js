import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import VideoForm from './VideoForm'
import { setUser } from './../reducers/userReducer'

const VideoList = (props) => {

  const [user, setUser] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBallroomAppUser')
    if (loggedUserJSON) {
      const userNew = JSON.parse(loggedUserJSON)
      setUser(userNew)
    }
  }, [])

  const videoForm = () => (
    <VideoForm
      notify={props.notify}
    />
  )

  let userVideos = props.videos.filter(function (video) {
    return video.author === user.username
  })

  return (
    <div> {videoForm()}
      <br></br>
      {userVideos.map(video =>
        <div key={video.id}>
          <Link id="videosList" to={`/videos/${video.id}`}>{video.title}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    videos: state.videos,
    user: state.user,
    users: state.users,
  }
}

export default connect(mapStateToProps, { setUser })(VideoList)