import React from 'react'
import { Stack, ListItem, Avatar, Heading, Button, List, Icon, Box,
    FormLabel, Input, Flex, RadioGroup, Radio, InputGroup, FormControl, Text} from '@chakra-ui/core'
import { Link } from 'react-router-dom'


const AppointmentCard = ({appointments, editAppointment, user, editAppointmentInput, onClickAppointment, onClickGoBackAppointment,
    handleInputsAppointment, handleOtherInputs, handleLocation, deleteAppointment}) => {
      console.log(appointments)
    return (
        <>
        {Object.entries(appointments).length === 0 ? (
            <>
                <Heading>You have no appointments</Heading>
                <Link to="/findVets"><Button>Create one</Button></Link>
            </>
            ) : editAppointment ?
            (
                <Box textAlign="start">
                <FormControl isRequired>
                <FormLabel fontSize="md"><strong>CHOOSE A PET</strong></FormLabel>
                  <RadioGroup onChange={handleInputsAppointment} name="pet" value={editAppointmentInput.pet} isInline>
                    {user.pets.map((el, index) => {
                        return (
                            <Radio key={index} value={el.name} >{el.name}</Radio>
                        )
                    })}
                   </RadioGroup>
                   <FormLabel mt={2} fontSize="md"><strong>CHOOSE A DATE</strong></FormLabel>
                   <Input onChange={handleInputsAppointment} value={editAppointmentInput.date.slice(0,10)} name='date' type='date'></Input>
                   <RadioGroup name="time" onChange={handleInputsAppointment} value={editAppointmentInput.time} isInline>
                   <FormLabel fontSize="md" mt={3}><strong>WHAT TIME?</strong></FormLabel>
                         {editAppointmentInput.hours.map(el => {
                           return (
                             <Radio key={el} value={el}>{el}</Radio>
                           )
                         })}
                    </RadioGroup>
                    <FormLabel fontSize="md" mt={2}><strong>LOCATION</strong></FormLabel>
                   <RadioGroup name="location" value={editAppointmentInput.location} onChange={handleLocation}>
                    <Radio value='clientAddress'>
                    <List styleType="disc">
                    {Object.entries(user.address).map((el, index) => {
                      return (
                      <ListItem key={index}>{el[0].charAt(0).toUpperCase()}{el[0].slice(1, el[0].length)} : {el[1]}</ListItem>
                      )
                    })}
                    </List>
                    </Radio>
                    <Radio onChange={handleOtherInputs} value='Other'>Other</Radio>
                    {editAppointmentInput.addressInput.location === 'Other' ? (
                      <InputGroup h='100%'>
                       <Flex direction="column" h='100%'>
                         <FormLabel htmlFor="text" >Address</FormLabel>
                         <Input name="street" type="text" placeholder="Street" />
                         <Input name="neighborhood" type="text" placeholder="Neighborhood" />
                         <Input name="code" type="number" placeholder="Postal code" />
                       </Flex>
                      </InputGroup>
                    ) : null}
                   </RadioGroup>
                   <Stack direction='row'>
                   <Flex direction="row">
                    <Button onClick={onClickGoBackAppointment} type='submit' variantColor="cyan" mr={2} mt={3}>Go Back</Button>
                    <Button type='submit' variantColor="green" mt={3}>Update</Button>
                   </Flex>
                   </Stack>
                   </FormControl>
                </Box>
            ) : (
                <Stack direction="column">
                {appointments.map((el, index) => {
                    return (
                    <Stack key={index} direction="row" p={2} align="center" justify="space-between" w='100%' border='.5px solid rgba(198,198,198,.5)' borderRadius="10px">
                      <Avatar src={el.vet.image} size="lg"/>
                      <Flex direction="column" justify="space-around" align="center">
                        <Heading as="h4" size="sm" pb={2}>{el.vet.name} & {el.pet[0].name}</Heading>
                          <Flex  direction="row" align="center">
                            <Icon name="calendar" mr={2}/><Text fontSize="sm"> {el.date.slice(0, 9)}</Text>
                          </Flex>
                          <Flex direction="row" align="center">
                            <Icon name="time" mr={2}/><Text fontSize="sm"> {el.time}</Text>
                          </Flex>
                      </Flex>
                      <Flex direction="column" h='100%'>
                        <Button name={el._id} onClick={onClickAppointment} mb={2} size="sm" variantColor="cyan"><Icon name="edit"/></Button>
                        <Button name={el._id} onClick={deleteAppointment} size="sm" variantColor="red"><Icon name="minus"/></Button>
                      </Flex>
                    </Stack>
                    )
                })}
                </Stack>
            )}
            </>
    )
}

export default AppointmentCard
