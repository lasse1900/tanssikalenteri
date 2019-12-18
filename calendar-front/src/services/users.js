import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  console.log('token', setToken)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newUser) => {
  console.log('cretae new user', newUser)
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newUser, config)
  return response.data
}

// const post = async (uri, data, headers) => {
//   const config = { headers: { ...headers, Authorization: token } }
//   console.log('post /services/users.js:', uri, data, headers)
//   const result = await axios.post(uri, data, config)
//   return result.data
// }

const post = async (uri, data) => {
  console.log('post /services/users.js:', uri, data)
  const result = await axios.post(uri, data)
  return result.data
}


export default { getAll, setToken, create, post }