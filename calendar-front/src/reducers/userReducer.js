import loginService from '../services/login'
import ballroomService from '../services/ballrooms'
import userService from '../services/users'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'CREATE_USER':
      return action.data
    case 'LOGOUT':
      return null
    case 'INIT':
      return action.data
    default:
      return state
  }
}

// actions creators

export const setUser = user => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBallroomAppUser', JSON.stringify(user))
    ballroomService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
    return user
  }
}

export const createUser = user => {
  return async dispatch => {
    const createdUser = await ballroomService.create(user)
    dispatch({
      type: 'CREATE_USER',
      data: createdUser
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    await ballroomService.deleteToken()
    window.localStorage.removeItem('loggedBallroomAppUser')
    dispatch({
      type: 'LOGOUT'
    })
  }

}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT',
      data: users
    })
  }
}

export default userReducer