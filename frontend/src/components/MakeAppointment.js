import React, { Component } from 'react'
import {
    InputGroup,
    InputLeftAddon,
    Input,
    Icon,
    Image,
    FormLabel,
    Heading,
    Radio,
    RadioGroup,
    Button,
    Box,
    Stack,
    Spinner,
    Alert,
    AlertIcon,
    InputRightAddon
  } from '@chakra-ui/core'
import {getLogged, getUser} from '../services'
import { MyContext } from '../context'



export default class MakeAppointment extends Component {

    state = {
        vet: {},
        spinner: true
    }

    componentDidMount = async () => {
        const {id} = this.props.match.params
        let { data: {user} } = await getUser(id)
        this.setState({vet: user, spinner: false})
        console.log(this.state)
    }

    render() {
        return (<MyContext.Consumer>
            {context => {
              const {vet} = this.state
              return (
            <>
                <Heading>Make an Appointment</Heading>
                <Stack direction="row" justify="space-around">
                  <Stack>
                      <Heading>Your veterinarian</Heading>
                      <Image src={vet.image}/>
                      <p>{vet.specialty}</p>
                      <p>{vet.university}</p>
                  </Stack>
                  <Stack>
                  <Heading>Appointment</Heading>
                  <Box as="form">
                    <FormLabel>Choose which pet needs the appointment</FormLabel>
                    <RadioGroup name="pet" isInline>
                    {context.state.user.pets.length === 0 ? (
                        <Alert status="warning">
                          <AlertIcon />
                          Seems your account is about expire, upgrade now
                        </Alert>
                  ) : this.state.spinner ? (<Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />) : (
                      context.user.pets.map(el => {
                          return (
                              <Radio>{el.name}</Radio>
                          )
                      })
                  )}
                     </RadioGroup>
                    </Box>
                  </Stack>
              </Stack>
            </>
              )}}
              </MyContext.Consumer>)
    }
}
