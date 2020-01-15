import axios from 'axios'
const baseUrl = '/api/calendars'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('calendars.js - token', token)
}

const deleteToken = () => {
  token = null
}

const create = async (newCalendar) => {
  console.log('calendars.js - create: [token]', token)
  const config = {
    headers: { Authorization: token }
  }
  console.log('services calendars -> token:', { token })
  const response = await axios.post(baseUrl, newCalendar, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const update = (calendar) => {
  const request = axios.put(`${baseUrl}/${calendar.id}`, calendar)
  return request.then(response => response.data)
}

const addComment = async (id, comment) => {
  console.log('id: commnet:', id, comment)
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const remove = async (id) => {
  console.log('id to remove', id)
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, getById, create, setToken, update, remove, deleteToken, addComment }