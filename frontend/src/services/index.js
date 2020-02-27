import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'here should be your production endpoint')
  : (baseURL = 'http://localhost:3000')

const service = axios.create({ baseURL, withCredentials: true })

export const signup = async (user) => {
  console.log('peticion', user)
  return await service.post('/signup', user)
}

export const login = async(user) => {
  return await service.post('/login', user)
}

export const logout = async() => {
  return await service.get('/logout')
}



