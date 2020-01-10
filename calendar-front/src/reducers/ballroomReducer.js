import ballroomService from '../services/ballrooms'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE':
    return action.data.ballrooms
  case 'CREATE_BALLROOM':
    console.log('CREATE BALLROOM -->', action)
    return [...state, action.data]
  case 'REMOVE_BALLROOM':
    return state.filter(b => b.id !== action.data)
  case 'ADD_COMMENT': {
    const newState = JSON.parse(JSON.stringify(state))
    console.log('newState', newState)
    const newBallroom = newState.find(ballroom => ballroom.id === action.data.ballroom)
    console.log('newBallroom', newBallroom)
    newBallroom.comments = newBallroom.comments.concat({ comment: action.data.comment, id: action.data.id })
    console.log('new comment', newBallroom.comments)
    return [...newState.filter(ballroom => ballroom.id !== newBallroom.id), newBallroom]
  }
  default:
    return state
  }
}

// actions creators

export const initializeBallrooms = () => {
  return async dispatch => {
    const ballrooms = await ballroomService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: {
        ballrooms: ballrooms
      }
    })
  }
}

export const createBallroom = ballroom => {
  console.log('ballroomReducer - createBallroom:', ballroom)
  return async dispatch => {
    const createdBallroom = await ballroomService.create(ballroom)
    dispatch({
      type: 'CREATE_BALLROOM',
      data: createdBallroom
    })
  }
}

export const addComment = (id, content) => {
  const comment = { comment: content }
  console.log('addComment', comment)
  return async dispatch => {
    const addedComment = await ballroomService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: addedComment
    })
  }
}

export const removeBallroom = ballroom => {
  return async dispatch => {
    await ballroomService.remove(ballroom.id)
    dispatch({
      type: 'REMOVE_BALLROOM',
      data: ballroom.id
    })
  }
}

export default reducer