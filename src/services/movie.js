import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/movie/`

const getPopularMovies = async page => {
  const response = await axios.get(baseUrl + page)
  return response
}

const getMovieDetails = async id => {
  const response = await axios.get(baseUrl + `details/${id}`)
  return response
}

const getMoviesByGenre = async id => {
  const response = await axios.get(baseUrl + `genre/${id}`)
  return response
}

const getMovieSearchResults = async query => {
  const response = await axios.get(baseUrl + `search/${query}`)
  return response
}

export default { getPopularMovies, getMovieDetails, getMoviesByGenre, getMovieSearchResults }