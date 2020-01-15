import videoService from '../services/videos'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_VIDEOS':
      return action.data.videos
    case 'CREATE_VIDEO':
      console.log('CREATE_VIDEO -->', action)
      return [...state, action.data]
    case 'REMOVE_VIDEO':
      return state.filter(b => b.id !== action.data)
    case 'ADD_VIDEO_COMMENT': {
      const newState = JSON.parse(JSON.stringify(state))
      console.log('newState', newState)
      const newVideo = newState.find(video => video.id === action.data.video)
      console.log('newVideo', newVideo)
      newVideo.comments = newVideo.comments.concat({ comment: action.data.comment, id: action.data.id })
      console.log('new comment', newVideo.comments)
      return [...newState.filter(videos => videos.id !== newVideo.id), newVideo]
    }
    default:
      return state
  }
}

// actions creators

export const initializeVideos = () => {
  return async dispatch => {
    const videos = await videoService.getAll()
    dispatch({
      type: 'INITIALIZE_VIDEOS',
      data: {
        videos: videos
      }
    })
  }
}

export const createVideo = video => {
  console.log('videoReducer - createVideo:', video)
  return async dispatch => {
    const createdVideo = await videoService.create(video)
    dispatch({
      type: 'CREATE_VIDEO',
      data: createdVideo
    })
  }
}

export const addComment = (id, content) => {
  const comment = { comment: content }
  console.log('addScoolComment', comment)
  return async dispatch => {
    const addedComment = await videoService.addComment(id, comment)
    dispatch({
      type: 'ADD_VIDEO_COMMENT',
      data: addedComment
    })
  }
}

export const removeVideo = video => {
  return async dispatch => {
    await videoService.remove(video.id)
    dispatch({
      type: 'REMOVE_VIDEO',
      data: video.id
    })
  }
}

export default reducer