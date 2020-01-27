import React from 'react'
import { connect } from 'react-redux'
import Comments from './CommentVideo'
import { removeVideo } from '../reducers/videoReducer'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const Video = ({ video, notify, removeVideo }) => {
  const history = useHistory()

  if (video === undefined) return null

  const remove = async () => {
    if (window.confirm(`remove video ${video.title}? by ${video.author}`)) {
      await removeVideo(video)
      notify(`video '${video.title}' removed succesfully`, false)
      history.push('/videos')
    }
  }

  return (
    <div>
      <div className='toggle' >
        {video.title}
        <br />
        <a href={video.url} target="_blank" rel="noopener noreferrer">{video.url} </a><br></br>
        <br /> <Button className="ui basic tiny button" onClick={remove}>remove</Button>
      </div>
      <Comments video={video} />
    </div>
  )
}

Video.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.user,
    videos: state.videos,
    users: state.users
  }
}

const mapDispatchToProps = {
  removeVideo: removeVideo
}

const ConnectedVideo = connect(mapStateToProps, mapDispatchToProps)(Video)

export default ConnectedVideo