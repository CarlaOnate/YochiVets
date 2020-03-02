import React, { Component } from 'react'
import { Stack, Box, Image, List, ListItem, Avatar, Heading, Spinner, Button, FormControl,
     FormLabel, Input, Flex, RadioGroup, Radio, Textarea, Icon, InputGroup} from '@chakra-ui/core'
import { getLogged, getUser, updateUser, createPet, deletePet, getClientAppointments, getAppointment } from '../services'
import { Link } from 'react-router-dom'
import PetCard from './PetCard'
import UserProfile from './UserProfile'
import AppointmentCard from './AppointmentCard'


export default class Profile extends Component {
    state = {
        user: {},
        pets: {},
        appointments: {},
        edit: false,
        editAppointment: false,
        editInput: {},
        createPet: false,
        petFormData: {
            sex: ['Female', 'Male'],
            sterilized: ['Yes', 'No']
        },
        createPetInput: {
            name: '',
            age: '',
            medicalHistory: [],
            sex: '',
            breed: '',
            sterilized: ''
        },
        editAppointmentInput: {
            client: '',
            vet: '',
            pet: '',
            addressInput: {
                location: '',
                other: {
                  street: '',
                  neighborhood: '',
                  code: ''
                }
            }
        }
    }

    componentDidMount = async () => {
        let {data: {logged}} = await getLogged()
        let {data: {user}} = await getUser(logged[0]._id)
        let {data: {appointments}} = await getClientAppointments(logged[0]._id)
        this.setState({user, pets: user.pets, editInput: user, appointments})
    }

    editProfile = (e) => {
        this.setState({edit: true})
    }

    goBackEdit = (e) => {
        this.setState({edit: false})
    }

    handleEditUserInputs = (e) => {
        const {name, value} = e.target
        this.setState(prevState => ({
            ...prevState,
            editInput: {
                ...prevState.editInput,
                [name]: value
            }
        }))
    }

    handleAddressEditInputs = (e) => {
        const {name, value} = e.target
        this.setState(prevState => ({
            ...prevState,
            editInput: {
                ...prevState.editInput,
                address: {
                    ...prevState.editInput.address,
                    [name]: value
                }
            }
        }))
    }

    editSubmit = async (e) => { //DETALLE CON IMAGEN DE USER
        e.preventDefault()
        const {editInput} = this.state
        let {data: {newUser}} = await updateUser(editInput)
        this.setState({user: newUser, edit: false})
    }

    onClickCreatePetButton = (e) => {
        this.setState({createPet: !this.state.createPet})
    }

    handleCreatePetInput = (e) => {
        const {name, value} = e.target
        if(name === 'medicalHistory'){
            this.setState(prevState => ({
                ...prevState,
                createPetInput: {
                    ...prevState.createPetInput,
                    [name]: [value]
                }
            }))
        } else {
            this.setState(prevState => ({
                ...prevState,
                createPetInput: {
                    ...prevState.createPetInput,
                    [name]: value
                }
            }))
        }
    }

    createPetSubmit = async (e) => {
        e.preventDefault()
        const {createPetInput} = this.state
        let sterilized = createPetInput.sterilized === 'Yes' ? 'true' : 'false'
        let newPet = {
            name: createPetInput.name,
            age: createPetInput.age,
            medicalHistory: createPetInput.medicalHistory,
            sex: createPetInput.sex,
            breed: createPetInput.breed,
            sterilized
        }
        let {data} = await createPet(newPet)
        this.setState(prevState => ({
            ...prevState,
            user: data.user,
            pets: data.user.pets,
            createPet: false,
            createPetInput: {
                name: '',
                age: '',
                medicalHistory: [],
                sex: '',
                breed: '',
                sterilized: ''
            }
        }))
    }

    deletePet = async (e) => {
        const {name} = e.target
        let {data} = await deletePet(name)
        this.setState({user: data.updatedUser, pets: data.updatedUser.pets})
    }

    onClickAppointment = async (e) => {
        const {name} = e.target
        let {data: {appointment}} = await getAppointment(name)
        if(appointment.location === 'Other'){
            this.setState(prevState => ({
                ...prevState,
                editAppointment: !this.state.editAppointment,
                editAppointmentInput:{
                    client: appointment.client._id,
                    vet: appointment.vet._id,
                    pet: appointment.pet.name,
                    addressInput: {
                        location: appointment.location,
                        other: {
                          street: appointment.other.street,
                          neighborhood: appointment.other.neighborhood,
                          code: appointment.other.code
                        }
                    }
                }
            }))
        }else  {
            this.setState(prevState => ({
                ...prevState,
                editAppointment: !this.state.editAppointment,
                editAppointmentInput:{
                    client: appointment.client._id,
                    vet: appointment.vet._id,
                    pet: appointment.pet.name,
                    addressInput: {
                        location: appointment.location,
                    }
                }
            }))
        }
    }

    onClickGoBackAppointment = (e) => {
        this.setState({editAppointment: !this.state.editAppointment})
    }

    render() {
        console.log(this.state, this.state.appointments)
        const {user, pets, appointments, edit, editInput, petFormData, createPetInput,
            createPet, editAppointment, editAppointmentInput} = this.state
        if(Object.entries(user).length === 0){
            return(
            <>
                <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Heading>Did you login?</Heading>
              <Link to="/signup"><Button>Login</Button></Link>
              </>
            )
        } else {
            return (
                <>
                <Heading>Hello {user.name}</Heading>
                <Stack direction='row' justify='space-between'>
                <UserProfile user={user} editInput={editInput} handleEditUserInputs={this.handleEditUserInputs} editProfile={this.editProfile}
                 editSubmit={this.editSubmit} goBackEdit={this.goBackEdit} edit={edit} handleAddressEditInputs={this.handleAddressEditInputs}
                />
                <Stack direction='column'>
                <Heading>Your Pets</Heading>
                    <PetCard state={this.state} createPet={createPet} pets={pets} user={user} createPetInput={createPetInput} petFormData={petFormData}
                    deletePet={this.deletePet} handleCreatePetInput={this.handleCreatePetInput} onClickCreatePetButton={this.onClickCreatePetButton} createPetSubmit={this.createPetSubmit}/>
                <Heading>Appointments</Heading>
                <AppointmentCard appointments={appointments} editAppointment={editAppointment} user={user} editAppointmentInput={editAppointmentInput} 
                onClickAppointment={this.onClickAppointment} onClickGoBackAppointment={this.onClickGoBackAppointment}/>
                </Stack>
                </Stack>
                </>
            )
        }
    }
}
