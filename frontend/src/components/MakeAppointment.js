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
    FormControl,
    Text,
    Tag,
    ListIcon
  } from '@chakra-ui/core'
import { getUser, getLogged, createAppointment } from '../services'
import { Link } from 'react-router-dom'
import Unauthorized from './Unauthorized'



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
        time: '',
        spinner: true,
        colors: {
          'General Medicine': 'blue.600',
          'Behaviour': 'teal.600',
          'Cardiology': 'red.600',
          'Neurology': 'purple.600',
          'Oncology': 'pink.600',
          'Nutrition': 'orange.600'
      }
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
        time: this.state.time,
        location: address
      }
      await createAppointment(appointment)
      this.props.history.push('/profile')
    }

    handleTimeInput = (e) => {
      const { value} = e.target
      this.setState({time: value})
    }

    randomKey = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
      })
  }

    chooseColor = (specialty) => {
    for(const key in this.state.colors){
        if (key === specialty) return this.state.colors[key]
    }
    }


    render() {
        const {vet, user, petInput, addressInput, dateInput, time} = this.state
        if(Object.entries(user).length === 0){
          return(
            <Box>
            <Unauthorized msg={'make an appointment'}/>
            </Box>
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
                  <Heading as="h3" size="lg" textAlign="start" ml={8}>Make an Appointment</Heading>
                  <Stack direction="row" justify="space-around">
                    <Stack justify="center" align="center">
                        <Box justify="center" align="center" borderWidth="1px" rounded="lg" overflow="hidden"  h="70vh" mt={10}>
                          <Box p="2" fontSize="sm" letterSpacing="wide" color="white" height="15%"  backgroundColor={this.chooseColor(vet.studies.specialty)} >
                          <Heading as="h3" size="lg" color="white">{vet.specialty}</Heading>
                          </Box>
                          <Stack justify="center" align="center" p="2">
                          <Heading as="h4" size="md" color="gray.700">{vet.name}</Heading>
                          <Image src={vet.image} w="12%" pb={7}/>
                          </Stack>
                          <Tag variantColor="gray">{vet.studies.specialty}</Tag>
                          <Text p="2" fontSize="md">{vet.studies.animal}</Text>
                          <Text p="2" fontSize="md">{vet.address.neighborhood}</Text>
                          <Text fontSize="lg">Available Hours: </Text>
                          <List>
                          {this.state.vet.availableHours.map(el => (
                            <ListItem key={this.randomKey()} isInline>
                              <ListIcon icon="time" color="green.500" />
                              {el}
                            </ListItem>
                          ))}
                          </List>
                        </Box>
                    </Stack>

                  <Stack h="70vh">
                    <Heading size="md" mt={4}>Appointment</Heading>
                    <Box onSubmit={this.appointmentSubmit} as="form" isRequired mt={3}>
                    <FormControl isRequired>
                    <Flex direction="column">
                      <FormLabel fontSize="md"><strong>CHOOSE A PET</strong></FormLabel>
                      {user.pets.length === 0 ? (
                          <Stack direction='column'>
                            <Alert status="warning">
                              <AlertIcon />
                              You currently have no pets
                              <Link to='/profile' mt={3}><Button variantColor="blue">Create One</Button></Link>
                            </Alert>
                          </Stack>
                    ) : (
                      <>
                      <RadioGroup key={this.randomKey()} name="pet" onChange={this.handlePetInput} value={petInput.pet} isInline mt={1}>
                        {user.pets.map(el => {
                            return (
                                <Radio key={this.randomKey()} value={el.name} >{el.name}</Radio>
                            )
                        })}
                       </RadioGroup>
                       <FormLabel mt={2} fontSize="md"><strong>CHOOSE A DATE</strong></FormLabel>
                       <Input onChange={this.handleDateInput} type='date' min={dateInput.minDate} name='date' value={dateInput.date}></Input>
                       <Flex justify="center" align="center">
                        <RadioGroup name="time" onChange={this.handleTimeInput} value={time} isInline>
                        <FormLabel fontSize="md" mt={3}><strong>WHAT TIME?</strong></FormLabel>
                          {vet.availableHours.map(el => {
                            return(
                              <Radio key={this.randomKey()} value={el} mt={1}>{el}</Radio>
                            )
                          })}
                        </RadioGroup>
                       </Flex>
                       <FormLabel fontSize="md" mt={2}><strong>LOCATION</strong></FormLabel>
                       <RadioGroup name="location" onChange={this.handleAddressInput} value={addressInput.location}>
                        <Radio value='clientAddress'>
                        <List styleType="disc">
                        {Object.entries(user.address).map((el, index) => {
                          return (
                          <ListItem key={this.randomKey()}>{el[0].charAt(0).toUpperCase()}{el[0].slice(1, el[0].length)} : {el[1]}</ListItem>
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
                       {this.state.petInput.pet === '' ? (
                       <Button mt={3} type='submit' isDisabled variantColor='green'>Create Appointment</Button>
                       ) : (
                       <Button mt={3} type='submit' variantColor='green'>Create Appointment</Button>
                       )}
                       </>
                    )}
                      </Flex>
                      </FormControl>
                      </Box>
                    </Stack>
                  </Stack>
              </>
              )
        }
    }
}
