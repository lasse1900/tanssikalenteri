import calendarService from '../services/calendars'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_CALENDARS':
      return action.data.calendars
    case 'CREATE_CALENDAR':
      console.log('CREATE_CALENDAR -->', action)
      return [...state, action.data]
    case 'REMOVE_CALENDAR':
      return state.filter(b => b.id !== action.data)
    case 'ADD_CALENDAR_COMMENT': {
      const newState = JSON.parse(JSON.stringify(state))
      console.log('newState', newState)
      const newCalendar = newState.find(calendar => calendar.id === action.data.calendar)
      console.log('newCalendar', newCalendar)
      newCalendar.comments = newCalendar.comments.concat({ comment: action.data.comment, id: action.data.id })
      console.log('new comment', newCalendar.comments)
      return [...newState.filter(calendars => calendars.id !== newCalendar.id), newCalendar]
    }
    default:
      return state
  }
}

// actions creators

export const initializeCalendars = () => {
  return async dispatch => {
    const calendars = await calendarService.getAll()
    dispatch({
      type: 'INITIALIZE_CALENDARS',
      data: {
        calendars: calendars
      }
    })
  }
}

export const createCalendar = calendar => {
  console.log('calendarReducer - createCalendar:', calendar)
  return async dispatch => {
    const createdCalendar = await calendarService.create(calendar)
    dispatch({
      type: 'CREATE_CALENDAR',
      data: createdCalendar
    })
  }
}

export const addComment = (id, content) => {
  const comment = { comment: content }
  console.log('addCalendarComment', comment)
  return async dispatch => {
    const addedComment = await calendarService.addComment(id, comment)
    dispatch({
      type: 'ADD_CALENDAR_COMMENT',
      data: addedComment
    })
  }
}

export const removeCalendar = calendar => {
  return async dispatch => {
    await calendarService.remove(calendar.id)
    dispatch({
      type: 'REMOVE_CALENDAR',
      data: calendar.id
    })
  }
}

export default reducer