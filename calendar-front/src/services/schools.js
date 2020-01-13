import axios from 'axios'
const baseUrl = '/api/schools'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('schools.js - token', token)
}

const deleteToken = () => {
  token = null
}

const create = async (newSchool) => {
  console.log('schools.js - create: [token]', token)
  const config = {
    headers: { Authorization: token }
  }
  console.log('services schools -> token:', { token })
  const response = await axios.post(baseUrl, newSchool, config)
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

const update = (school) => {
  const request = axios.put(`${baseUrl}/${school.id}`, school)
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