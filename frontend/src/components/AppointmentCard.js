import React from 'react'
import { Stack, Box, ListItem, Avatar, Heading, Button, List, Icon,
    FormLabel, Input, Flex, RadioGroup, Radio, InputGroup} from '@chakra-ui/core'
import { Link } from 'react-router-dom'


const AppointmentCard = ({appointments, editAppointment, user, editAppointmentInput, onClickAppointment, onClickGoBackAppointment}) => {
    return (
        <>
        {Object.entries(appointments).length === 0 ? (
            <>
                <Heading>You have no appointments</Heading>
                <Link to="/findVets"><Button>Create one</Button></Link>
            </>
            ) : editAppointment ?
            (
                <>
                  <RadioGroup name="pet" isInline>
                    {user.pets.map((el, index) => {
                        return (
                            <Radio key={index} value={el.name} >{el.name}</Radio>
                        )
                    })}
                   </RadioGroup>
                   <FormLabel>When is the appointment?</FormLabel>
                   <Input type='date' name='date'></Input>
                   <FormLabel>Which location?</FormLabel>
                   <RadioGroup name="location">
                    <Radio value='clientAddress'>
                    <List styleType="disc">
                    {Object.entries(user.address).map((el, index) => {
                      return (
                      <ListItem key={index}>{el[0].charAt(0).toUpperCase()}{el[0].slice(1, el[0].length)} : {el[1]}</ListItem>
                      )
                    })}
                    </List>
                    </Radio>
                    <Radio value='Other'>Other</Radio>
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
                   <Button onClick={onClickGoBackAppointment} type='submit'>Go Back</Button>
                   <Button type='submit'>Create Appointment</Button>
                </>
            ) : (
                <Stack direction="row">
                {appointments.map(el => {
                    return (
                    <Stack direction="row">
                        <Box>
                        <Avatar src={el.vet.image}/>
                        <p>{el.vet.name}</p>
                        {console.log(el)}
                        <p>{el.vet.studies.animal}</p>
                        <p>{el.vet.studies.sepcialty}</p>
                        </Box>
                        <Box>
                            <p>Date: {el.date}</p>
                        </Box>
                    <Button name={el._id} onClick={onClickAppointment} h='100%'><Icon name="view"/></Button>
                    </Stack>
                    )
                })}
                </Stack>
            )}
            </>
    )
}

export default AppointmentCard
