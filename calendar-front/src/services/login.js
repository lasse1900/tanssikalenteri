import axios from 'axios'
const baseUrl = '/api/login'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const get = async (url) => {
  const config = { headers: { Authorization: token }}
  const result = await axios.get(url, config)
  return result.data
}

const post = async (url, data, headers) => {
  const config = { headers: { ...headers, Authorization: token }}
  const result = await axios.post(url, data, config)
  return result.data
}

export default { login, setToken, get, post }