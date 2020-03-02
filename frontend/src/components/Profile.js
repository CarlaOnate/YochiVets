import React, { Component } from 'react'
import { Stack, Box, Image, List, ListItem, Avatar, Heading, Spinner, Button, FormControl, FormLabel, Input, Flex, RadioGroup, Radio, Textarea } from '@chakra-ui/core'
import { getLogged, getUser, updateUser, createPet } from '../services'
import { Link } from 'react-router-dom'


export default class Profile extends Component {
    state = {
        user: {},
        pets: {},
        edit: false,
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
        }
    }

    componentDidMount = async () => {
        let {data: {logged}} = await getLogged()
        let {data: {user}} = await getUser(logged[0]._id)
        this.setState({user, pets: user.pets, editInput: user})
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
        this.setState({createPet: false, user: data.user, pets: data.user.pets})
        console.log(data, data.user, data.user.pets)
    }


    render() {
        console.log(this.state)
        const {user, pets, edit, editInput, petFormData, createPetInput} = this.state
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
                {!edit ? (
                <Stack>
                <Box p={5} textAlign='center'>
                <Image src={user.image} w='40%' m={0}/>
                <List>
                    <ListItem><Heading>Name:</Heading> {user.name}</ListItem>
                    <ListItem><Heading>Email:</Heading> {user.email}</ListItem>
                    <ListItem><Heading>Phone:</Heading> {user.phone}</ListItem>
                    <Heading>Address: </Heading>
                    {Object.entries(user.address).map((el, index) => {
                      return (
                        <ListItem key={index}>{el[0].charAt(0).toUpperCase()}{el[0].slice(1, el[0].length)} : {el[1]}</ListItem>
                      )
                    })}
                </List>
                <Button onClick={this.editProfile}>Edit Profile</Button>
                </Box>
                </Stack>
                ) : (
                <Stack direction='row' justify='space-between'>
                <Box p={5} as='form' type='' textAlign='center' enctype="multipart/form-data">
                <FormControl >
                <Image src={user.image} w='40%' m={0}/>
                <Input onChange={this.handleEditUserInputs} type='file' name='image'/>
                <List>
                    <ListItem><Heading>Name:</Heading><Input  onChange={this.handleEditUserInputs} name='name' value={editInput.name}/></ListItem>
                    <ListItem><Heading>Email:</Heading><Input onChange={this.handleEditUserInputs} name='email' value={editInput.email}/></ListItem>
                    <ListItem><Heading>Phone:</Heading><Input onChange={this.handleEditUserInputs} name='phone' value={editInput.phone}/></ListItem>
                    <Flex direction="column" h='100%'>
                        <FormLabel htmlFor="text" >Address</FormLabel>
                        <Input onChange={this.handleAddressEditInputs} value={editInput.address.street} name="street" type="text" />
                        <Input onChange={this.handleAddressEditInputs} value={editInput.address.neighborhood} name="neighborhood" type="text" />
                        <Input onChange={this.handleAddressEditInputs} value={editInput.address.code} name="code" type="number"/>
                    </Flex>
                </List>
                </FormControl>
                <Button onClick={this.goBackEdit}>Go Back</Button>
                <Button type='submit' onClick={this.editSubmit}>Save</Button>
                </Box>
                </Stack>
                )}
                <Heading>Your Pets</Heading>
                <Stack direction="column">
                    {user.pets.length === 0 ? (
                    <>
                        <Heading>You have no pets</Heading>
                        <Button onClick={this.onClickCreatePetButton} m={3}>Create pets</Button>
                    </>
                    ) : this.state.createPet === false ? (
                        <>
                        {pets.map((el, index) => {
                            return (
                        <Stack key={el._id} justify='row'>
                        <Avatar key={el.image} src={el.image}></Avatar>
                        <p key={el.name}>{el.name}: {el.age} years</p>
                        <Button key={el.index}>Edit Pet, MSF</Button>
                        </Stack>
                            )
                        })}
                        </>
                    ): (
                        <Box as="form" onSubmit={this.createPetSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Type in your pet's information</FormLabel>
                            <Input onChange={this.handleCreatePetInput} value={createPetInput.name} name="name" type="text" placeholder="Pet's Name"></Input>
                            <Input onChange={this.handleCreatePetInput} value={createPetInput.age} name="age" type="text" placeholder="Pet's Age"></Input>
                            <Textarea onChange={this.handleCreatePetInput} value={createPetInput.medicalHistory[0]} name="medicalHistory" placeholder="Write your pet's Medical History"/>
                            <FormLabel>Sex</FormLabel>
                            <RadioGroup name="sex" onChange={this.handleCreatePetInput} value={createPetInput.sex} isInline>
                                {petFormData.sex.map((el) => {
                                    return (
                                    <Radio value={el} key={el}>{el}</Radio>
                                    )
                                })}
                            </RadioGroup>
                            <Input onChange={this.handleCreatePetInput} value={createPetInput.breed} name="breed" type="text" placeholder="Your pet's breed"></Input>
                            <FormLabel>Sterilized</FormLabel>
                            <RadioGroup name="sterilized" onChange={this.handleCreatePetInput} value={createPetInput.sterilized} isInline>
                                {petFormData.sterilized.map((el) => {
                                    return (
                                    <Radio value={el} key={el}>{el}</Radio>
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <Button type="submit" >Create</Button>
                        </Box>
                    )}
                    {this.state.createPet ? (
                        <Button onClick={this.onClickCreatePetButton} m={3}>Back</Button>
                    ) : (
                        <Button onClick={this.onClickCreatePetButton} m={3}>New Pet</Button>
                    )}
                </Stack>
                </Stack>
                </>
            )
        }
    }
}
