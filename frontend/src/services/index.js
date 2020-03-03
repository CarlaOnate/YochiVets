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
  return await service.post('/vet-signup', user)
}

export const login = async(user) => {
  return await service.post('/login', user)
}

export const logout = async() => {
  return await service.get('/logout')
}

export const getLogged = async () => {
  return await service.get('/loggedUser')
}

export const getUser = async (id) => {
  return await service.get(`/client/${id}`)
}

export const updateUser = async (user) => {
  console.log(user, 'SERVICE')
  return await service.put(`/client/${user._id}`, user)
}


//FINDVETS

export const getAllVetsAPI = async() => {
  return await service.get('/allVets')
}

export const getBySpecialty = async (specialty) => {
  return await service.get(`/vet/${specialty}`)
}

//Appointments

export const createAppointment = async (appointment) => {
  return await service.post('/appointment', appointment)
}

export const getClientAppointments = async (id) => {
  return await service.get(`/appointment/client/${id}`)
}

export const getAppointment = async (id) => {
  return await service.get(`/appointment/${id}`)
}

export const deleteAppointmentAPI = async (id) => {
  return await service.delete(`/appointment/${id}`)
}


//PETS

export const createPet = async (pet) => {
  return await service.post('/pet', pet)
}

export const getPetAPI= async (id) => {
return await service.get(`/pet/${id}`)
}

export const editPetAPI = async (newPet) => {
  console.log(newPet.id)
  return await service.put(`/pet/${newPet.id}`, newPet)
}

export const deletePet = async (id) => {
  return await service.delete(`/pet/${id}`)
}
