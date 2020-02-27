import React from 'react'
import {
    Flex,
    FormControl,
    InputGroup,
    InputLeftAddon,
    Input,
    Icon,
    FormHelperText,
    FormLabel,
    Button
  } from '@chakra-ui/core'


const FormSubmit = () => {
    return (
       <>
        <FormControl isRequired h={'70vh'} justifyContent="spaceAround">
            <FormLabel htmlFor="text">Full name</FormLabel>
            <Input name="name" type="text" placeholder="Full name"/>
            <FormLabel htmlFor="email">Email</FormLabel>
                <InputGroup>
                  <InputLeftAddon><Icon name="email"/></InputLeftAddon>
                  <Input name="email" type="email" placeholder="Email" />
                </InputGroup>

                <FormLabel htmlFor="number">Phone</FormLabel>
                <InputGroup>
                <InputLeftAddon><Icon name="phone"/></InputLeftAddon>
                  <Input name="phone" type="number" placeholder="Phone number" />
                </InputGroup>
                <InputGroup>
                  <Flex direction="column">
                  <FormLabel htmlFor="text" >Address</FormLabel>
                  <FormHelperText id="email-helper-text" p={0}>Your information will no be shared to anyone ever.</FormHelperText>
                  <Input m={2} name="street" type="text" placeholder="Street"/>
                  <Input m={2} type="neighborhood" placeholder="Neighborhood"/>
                  <Input m={2} type="postalCode" placeholder="Postal Code"/>
                  </Flex>
                </InputGroup>
            <Button type="submit">Submit</Button>
            </FormControl>
       </>
    )
}

export default FormSubmit
