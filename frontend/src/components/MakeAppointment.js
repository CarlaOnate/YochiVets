import React, { Component } from 'react'
import {
    Image,
    FormLabel,
    Heading,
    Radio,
    RadioGroup,
    Box,
    Stack,
    Spinner,
    Alert,
    AlertIcon,
    Input,
    Button,
    List,
    ListItem,
    InputGroup,
    Flex,
    FormControl
  } from '@chakra-ui/core'
import { getUser, getLogged, createAppointment } from '../services'
import { Link } from 'react-router-dom'



export default class MakeAppointment extends Component {

    state = {
        vet: {},
        user: {},
        petInput: {
          pet: '',
          petId: ''
        },
        addressInput: {
          location: '',
          other: {
            street: '',
            neighborhood: '',
            code: ''
          }
        },
        dateInput: {
          date: '',
          minDate: ''
        },
        spinner: true
    }

    componentDidMount = async () => {
        const {id} = this.props.match.params
        const {data} = await getLogged()
        let { data: {user} } = await getUser(id)
        const today = new Date()
        const dd = today.getDate()
        const mm = today.getMonth()+1
        const yyyy = today.getFullYear()
        this.setState(prevState => ({
          ...prevState,
          vet: user,
          user: data.logged[0],
          dateInput: {
            ...prevState.dateInput,
            minDate: `${yyyy}-${mm}-${dd}`
          }
        }))
    }

    handlePetInput = (e) => {
      const { value} = e.target
      this.setState({petInput: {pet: value}})
    }

    handleAddressInput = (e) => {
      const {name, value} = e.target
      this.setState(prevState => ({
        ...prevState,
        addressInput: {
          ...prevState.addressInput,
          [name]: value
        }
      }))
    }

    handleOtherAddress = (e) => {
      const {name, value} = e.target
      this.setState(prevState => ({
        ...prevState,
        addressInput: {
          ...prevState.addressInput,
         other: {
           ...prevState.addressInput.other,
           [name]: value
         }
        }
      }))
    }

    handleDateInput = (e) => {
      const {name, value} = e.target
      this.setState(prevState => ({
        ...prevState,
        dateInput: {
          ...prevState.dateInput,
          [name]: value,
          }
        }
      ))
    }

    appointmentSubmit = async (e) => {
      e.preventDefault()
      let ind
      let address
      this.state.user.pets.forEach((el, index) => {
        if(el.name === this.state.petInput.pet){
          ind = index
        }
      })
      if(this.state.addressInput.location === 'clientAddress'){
       address = this.state.user.address
      } else {
        address = this.state.addressInput.other
      }
      let appointment = {
        client: this.state.user._id,
        vet: this.state.vet._id,
        pet: this.state.user.pets[ind]._id,
        date: this.state.dateInput.date,
        location: address
      }
      await createAppointment(appointment)
    }

    render() {
        const {vet, user, petInput, addressInput, dateInput} = this.state
        if(Object.entries(user).length === 0){
          return(
              <Stack w='50%'>
              <Alert>Please login to do this</Alert>
              <Link to="/signup"><Button>Login</Button></Link>
              </Stack>
          )
        } else if(Object.entries(vet).length === 0){
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
                  <Heading>Make an Appointment</Heading>
                  <Stack direction="row" justify="space-around">
                    <Stack>
                        <Heading>Your veterinarian</Heading>
                        <Image src={vet.image} size='sm'/>
                        <p>{vet.name}</p>
                        <p>{vet.studies.specialty}</p>
                        <p>{vet.studies.animal}</p>
                        <p>{vet.studies.cedula}</p>
                        <p>{vet.studies.university}</p>
                    </Stack>

                    <Stack>
                    <Heading>Appointment</Heading>
                    <Box onSubmit={this.appointmentSubmit} as="form" isRequired>
                    <FormControl isRequired>
                      <FormLabel>Choose which pet needs the appointment</FormLabel>
                      {user.pets.length === 0 ? (
                          <Stack direction='column'>
                            <Alert status="warning">
                              <AlertIcon />
                              You currently have no pets
                              <Link to='/profile'><Button>Create One</Button></Link>
                            </Alert>
                          </Stack>
                    ) : (
                      <>
                      <RadioGroup name="pet" onChange={this.handlePetInput} value={petInput.pet} isInline>
                        {user.pets.map((el, index) => {
                            return (
                                <Radio key={index} value={el.name} >{el.name}</Radio>
                            )
                        })}
                       </RadioGroup>
                       <FormLabel>When is the appointment?</FormLabel>
                       <Input onChange={this.handleDateInput} type='date' min={dateInput.minDate} name='date' value={dateInput.date}></Input>
                       <FormLabel>Which location?</FormLabel>
                       <RadioGroup name="location" onChange={this.handleAddressInput} value={addressInput.location}>
                        <Radio value='clientAddress'>
                        <List styleType="disc">
                        {Object.entries(user.address).map((el, index) => {
                          return (
                          <ListItem key={index}>{el[0].charAt(0).toUpperCase()}{el[0].slice(1, el[0].length)} : {el[1]}</ListItem>
                          )
                        })}
                        </List>
                        </Radio>
                        <Radio  value='Other'>Other</Radio>
                        {addressInput.location === 'Other' ? (
                          <InputGroup h='100%'>
                           <Flex direction="column" h='100%'>
                             <FormLabel htmlFor="text" >Address</FormLabel>
                             <Input onChange={this.handleOtherAddress} value={addressInput.other.street} name="street" type="text" placeholder="Street" />
                             <Input onChange={this.handleOtherAddress} value={addressInput.other.neighborhood} name="neighborhood" type="text" placeholder="Neighborhood" />
                             <Input onChange={this.handleOtherAddress} value={addressInput.other.code} name="code" type="number" placeholder="Postal code" />
                           </Flex>
                          </InputGroup>
                        ) : null}
                       </RadioGroup>
                       <Button type='submit'>Create Appointment</Button>
                       </>
                    )}
                      </FormControl>
                      </Box>
                    </Stack>
                </Stack>
              </>
              )
        }
    }
}
