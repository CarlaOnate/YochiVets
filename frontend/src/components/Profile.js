import React, { Component } from 'react'
import { Stack, Box, Image, List, ListItem, Heading, Spinner, Button, FormControl, FormLabel, Input, Flex } from '@chakra-ui/core'
import { getLogged, getUser, updateUser } from '../services'


export default class Profile extends Component {
    state = {
        user: {},
        pets: {},
        edit: false,
        editInput: {}
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

    editSubmit = async (e) => {
        e.preventDefault()
        const {editInput} = this.state
        let {data: {newUser}} = await updateUser(editInput)
        this.setState({user: newUser, edit: false})
    }


    render() {
        console.log(this.state)
        const {user, pets, edit, editInput} = this.state
        if(Object.entries(user).length === 0){
            return(
                <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )
        } else {
            return (
                <>
                <Heading>Hello {user.name}</Heading>
                {!edit ? (
                <Stack direction='row' justify='space-between'>
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
                </>
            )
        }
    }
}
