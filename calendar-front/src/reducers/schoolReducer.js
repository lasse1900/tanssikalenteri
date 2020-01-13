import schoolService from '../services/schools'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE_SCHOOLS':
    return action.data.schools
  case 'CREATE_SCHOOL':
    console.log('CREATE_SCHOOL -->', action)
    return [...state, action.data]
  case 'REMOVE_SCHOOL':
    return state.filter(b => b.id !== action.data)
  case 'ADD_SCHOOL_COMMENT': {
    const newState = JSON.parse(JSON.stringify(state))
    console.log('newState', newState)
    const newSchool = newState.find(schools => schools.id === action.data.schools)
    console.log('newBallroom', newSchool)
    newSchool.comments = newSchool.comments.concat({ comment: action.data.comment, id: action.data.id })
    console.log('new comment', newSchool.comments)
    return [...newState.filter(schools => schools.id !== newSchool.id), newSchool]
  }
  default:
    return state
  }
}

// actions creators

export const initializeSchools = () => {
  return async dispatch => {
    const schools = await schoolService.getAll()
    dispatch({
      type: 'INITIALIZE_SCHOOLS',
      data: {
        schools: schools
      }
    })
  }
}

export const createSchool = school => {
  console.log('schoolReducer - createSchool:', school)
  return async dispatch => {
    const createdSchool = await schoolService.create(school)
    dispatch({
      type: 'CREATE_SCHOOL',
      data: createdSchool
    })
  }
}

export const addScoolComment = (id, content) => {
  const comment = { comment: content }
  console.log('addScoolComment', comment)
  return async dispatch => {
    const addedSchoolComment = await schoolService.addScoolComment(id, comment)
    dispatch({
      type: 'ADD_SCHOOL_COMMENT',
      data: addedSchoolComment
    })
  }
}

export const removeSchool = school => {
  return async dispatch => {
    await schoolService.remove(school.id)
    dispatch({
      type: 'REMOVE_SCHOOL',
      data: school.id
    })
  }
}

export default reducer