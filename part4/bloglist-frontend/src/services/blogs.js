import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToen) => {
  token = `Bearer ${newToen}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = async (blog) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const incrementLike = async (id, blog) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

export default { getAll, add, setToken, incrementLike }