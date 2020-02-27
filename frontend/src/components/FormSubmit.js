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
    Heading,
    Button,
    Box
  } from '@chakra-ui/core'


const FormSubmit = ({signupInput, state, handleAddress, submit}) => {
  let {signupForm: {name, email, password, phone, address}} = state
    return (
       <Box onSubmit={submit} as="form">
        <FormControl isRequired h={'100%'} justifyContent="spaceAround">
          <Heading>Signup</Heading>
              <FormLabel htmlFor="text">Full name</FormLabel>
              <Input onChange={(e) => signupInput(e, 'CLIENT')} value={name} name="name" type="text" placeholder="Full name"/>

              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="email"/></InputLeftAddon>
                <Input onChange={(e) => signupInput(e, 'CLIENT')} value={email} name="email" type="email" placeholder="Email" />
              </InputGroup>

              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="password"/></InputLeftAddon>
                <Input onChange={(e) => signupInput(e, 'CLIENT')} value={password} name="password" type="password" placeholder="Password" />
              </InputGroup>

              <FormLabel htmlFor="number">Phone</FormLabel>
              <InputGroup>
              <InputLeftAddon><Icon name="phone"/></InputLeftAddon>
                <Input onChange={(e) => signupInput(e, 'CLIENT')} value={phone} name="phone" type="number" placeholder="Phone number" />
              </InputGroup>

              <InputGroup h='100%'>
                <Flex direction="column" h='100%'>
                  <FormLabel htmlFor="text" >Address</FormLabel>
                  <FormHelperText id="email-helper-text" p={0}>Your information will no be shared to anyone ever.</FormHelperText>
                  <Input onChange={handleAddress} value={address.street} name="street" type="text" placeholder="Street" />
                  <Input onChange={handleAddress} value={address.neighborhood} name="neighborhood" type="text" placeholder="Neighborhood" />
                  <Input onChange={handleAddress} value={address.code} name="code" type="number" placeholder="Postal code" />
                </Flex>
              </InputGroup>
            </FormControl>
            <Button type="submit" p={2} m={4}>Submit</Button>
       </Box>
    )
}

export default FormSubmit
