import { RAWG_KEY, RAWG_URL } from './api'
import axios from 'axios'

export default async function grabGames() {
  try {
    const res = await axios.get(`${RAWG_URL}/games?key=${RAWG_KEY}`)
    console.log(res)
    return res.data.results
  } catch (error) {
    throw error
  }
}
