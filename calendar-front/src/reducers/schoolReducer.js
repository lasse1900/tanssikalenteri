import schoolService from '../services/schools'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_SCHOOLS':
      return action.data.schools
    case 'CREATE_SCHOOL':
      return [...state, action.data]
    case 'REMOVE_SCHOOL':
      return state.filter(b => b.id !== action.data)
    case 'ADD_SCHOOL_COMMENT': {
      const newState = JSON.parse(JSON.stringify(state))
      const newSchool = newState.find(school => school.id === action.data.school)
      newSchool.comments = newSchool.comments.concat({ comment: action.data.comment, id: action.data.id })
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
  return async dispatch => {
    const createdSchool = await schoolService.create(school)
    dispatch({
      type: 'CREATE_SCHOOL',
      data: createdSchool
    })
  }
}

export const addComment = (id, content) => {
  const comment = { comment: content }
  return async dispatch => {
    const addedComment = await schoolService.addComment(id, comment)
    dispatch({
      type: 'ADD_SCHOOL_COMMENT',
      data: addedComment
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