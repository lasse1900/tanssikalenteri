import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newUser) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newUser, config)
  return response.data
}

const post = async (uri, data) => {
  const result = await axios.post(uri, data)
  return result.data
}

export default { getAll, create, post }