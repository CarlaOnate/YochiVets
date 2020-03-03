import React from 'react'
import { Stack, Box, ListItem, Avatar, Heading, Button, List, Icon,
    FormLabel, Input, Flex, RadioGroup, Radio, InputGroup, FormControl} from '@chakra-ui/core'
import { Link } from 'react-router-dom'


const AppointmentCard = ({appointments, editAppointment, user, editAppointmentInput, onClickAppointment, onClickGoBackAppointment,
    handleInputsAppointment, handleOtherInputs, handleLocation, deleteAppointment}) => {
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
                <FormControl isRequired>
                <FormLabel>Choose a pet</FormLabel>
                  <RadioGroup onChange={handleInputsAppointment} name="pet" value={editAppointmentInput.pet} isInline>
                    {user.pets.map((el, index) => {
                        return (
                            <Radio key={index} value={el.name} >{el.name}</Radio>
                        )
                    })}
                   </RadioGroup>
                   <FormLabel>When is the appointment?</FormLabel>
                   <Input onChange={handleInputsAppointment} value={editAppointmentInput.date.slice(0,10)} name='date' type='date'></Input>
                   <RadioGroup name="time" onChange={handleInputsAppointment} value={editAppointmentInput.time} isInline>
                       <FormLabel>At what time?</FormLabel>
                         {editAppointmentInput.hours.map(el => {
                           return (
                             <Radio key={el} value={el}>{el}</Radio>
                           )
                         })}
                    </RadioGroup>
                   <FormLabel>Which location?</FormLabel>
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
                   <Button onClick={onClickGoBackAppointment} type='submit'>Go Back</Button>
                   <Button type='submit'>Update</Button>
                   </Stack>
                   </FormControl>

                </>
            ) : (
                <Stack direction="row">
                {appointments.map(el => {
                    return (
                    <Stack direction="row">
                        <Box>
                        <Avatar src={el.vet.image}/>
                        <p>{el.vet.name}</p>
                        <p>{el.vet.studies.animal}</p>
                        <p>{el.vet.studies.sepcialty}</p>
                        </Box>
                        <Box>
                            <p>Date: {el.date.slice(0, 9)}</p>
                            {console.log(el)}
                            <strong>Time: {el.time}</strong>
                        </Box>
                    <Button name={el._id} onClick={onClickAppointment} h='100%'><Icon name="view"/></Button>
                    <Button name={el._id} onClick={deleteAppointment} h='100%'><Icon name="minus"/></Button>
                    </Stack>
                    )
                })}
                </Stack>
            )}
            </>
    )
}

export default AppointmentCard
