import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import ballroomReducer from './reducers/ballroomReducer'
import schoolReducer from './reducers/schoolReducer'
import videoReducer from './reducers/videoReducer'
import calendarReducer from './reducers/calendarReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'


const reducer = combineReducers({
  notification: notificationReducer,
  ballrooms: ballroomReducer,
  schools: schoolReducer,
  videos: videoReducer,
  calendars: calendarReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store