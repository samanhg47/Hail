import Axios from 'axios'

//Database Auth
<<<<<<< HEAD
export const DB_URL = 'http://localhost:3001/api'
export const Client = Axios.create({ baseURL: DB_URL })
=======
export const DB_URL = 'http://localhost:3001'
const Client = Axios.create({ baseURL: DB_URL })
>>>>>>> 8dc0c385e9b20d8869bb27087c7ceb07f33a8875

// Intercepts every request axios makes
Client.interceptors.request.use(
  (config) => {
    // Reads the token in localstorage
    const token = localStorage.getItem('token')
    // if the token exists, we set the authorization header
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config // We return the new config if the token exists or the default config if no token exists.
    // Provides the token to each request that passes through axios
  },
  (error) => Promise.reject(error)
)
export default Client
//RAWG Auth
export const RAWG_URL = `https://api.rawg.io/api`
export const RAWG_KEY = process.env.REACT_APP_KEY
