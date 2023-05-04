import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/`

const getUser = async credentials => {
  const response = await axios.get(baseUrl)
  return response
}

const login = async credentials => {
  const response = await axios.post(baseUrl + 'login', credentials)
  return response
}

const googleLogin = async credentials => {
  const response = await axios.post(baseUrl + 'login/google')
  return response
}

const register = async credentials => {
  const response = await axios.post(baseUrl + 'register', credentials)
  return response.data
}
  
const logout = async credentials => {
  const response = await axios.post(baseUrl + 'logout')
  return response
}

const getFavorites = async credentials => {
  const response = await axios.get(baseUrl + 'favorite')
  return response
}

const checkIfFavorite = async id => {
  const response = await axios.get(baseUrl + `favorite/${id}`)
  return response
}

const addFavorite = async movie => {
  const response = await axios.put(baseUrl + 'favorite', movie)
  return response
}

const removeFavorite = async id => {
  const response = await axios.put(baseUrl + `favorite/${id}`)
  return response
}
  

export default { getUser, login, googleLogin, register, logout, getFavorites, checkIfFavorite, addFavorite, removeFavorite }