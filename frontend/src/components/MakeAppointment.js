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
    Button
  } from '@chakra-ui/core'
import { getUser, getLogged } from '../services'
import { MyContext } from '../context'
import { Link } from 'react-router-dom'



export default class MakeAppointment extends Component {

    state = {
        vet: {},
        user: {},
        spinner: true
    }

    componentDidMount = async () => {
        const {id} = this.props.match.params
        const {data} = await getLogged()
        let { data: {user} } = await getUser(id)
        this.setState({vet: user, spinner: false, user: data.logged})
        console.log(this.state)
    }

    render() {
        const {vet} = this.state
        console.log(this.state.user)
        if(!this.state.user){
          return(
              <>
              <Alert>Please login to do this</Alert>
              <Button><Link to="/signup">Login</Link></Button>
              </>
          )
        } else if(!this.state.vet){
          return(
              <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )
        }
        return (
            <>
                <Heading>Make an Appointment</Heading>
                <Stack direction="row" justify="space-around">
                  <Stack>
                      <Heading>Your veterinarian</Heading>
                      <Image src={vet.image} size='sm'/>
                      <p>{vet.name}</p>
                      <p>{vet.studies}</p>
                  </Stack>
                  <Stack>
                  <Heading>Appointment</Heading>
                  <Box as="form" isRequired>
                    <FormLabel>Choose which pet needs the appointment</FormLabel>
                    <RadioGroup name="pet" isInline>
                    {console.log(this.state)}
                    {/* {this.state.spinner ? (<Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />) : this.state.user.pets.length === 0 ? (
                        <Alert status="warning">
                          <AlertIcon />
                          Seems your account is about expire, upgrade now
                        </Alert>
                  ) : (
                      this.user.pets.map(el => {
                          return (
                              <Radio>{el.name}</Radio>
                          )
                      })
                  )} */}
                     </RadioGroup>
                     <FormLabel>When is the appointment?</FormLabel>
                     <Input type={'Date'}></Input>
                    </Box>
                  </Stack>
              </Stack>
            </>
            )
    }
}
