import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'here should be your production endpoint')
  : (baseURL = 'http://localhost:3000')

const service = axios.create({ baseURL, withCredentials: true })
//AUTH
export const signup = async (user) => {
  return await service.post('/signup', user)
}
export const signupVet = async (user) => {
  console.log('vetSignup', user)
  return await service.post('/vet-signup', user)
}

export const login = async(user) => {
  return await service.post('/login', user)
}

export const logout = async() => {
  return await service.get('/logout')
}

//FINDVETS

export const getAllVetsAPI = async() => {
  return await service.get('/allVets')
}


