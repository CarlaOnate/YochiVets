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
    Box,
    Stack
  } from '@chakra-ui/core'


const FormSubmit = ({signupInput, state, handleAddress, submit}) => {
  const {signupForm: {name, email, password, phone, address}} = state
    return (
       <Box as="form" onSubmit={submit}>
        <FormControl isRequired justifyContent="spaceAround">
          <Heading>Signup</Heading>
            <Stack >
            <FormLabel htmlFor="text">Full name</FormLabel>
              <Input size="sm" onChange={(e) => signupInput(e, 'CLIENT')} value={name} name="name" type="text" placeholder="Full name"/>

              <FormLabel>Email</FormLabel>
              <InputGroup size="sm">
                <InputLeftAddon><Icon name={"email"}/></InputLeftAddon>
                <Input  onChange={(e) => signupInput(e, 'CLIENT')} value={email} name="email" type="text" placeholder="Email" />
              </InputGroup>

              <FormLabel>Password</FormLabel>
              <InputGroup size="sm">
                <InputLeftAddon><Icon name="password"/></InputLeftAddon>
                <Input  onChange={(e) => signupInput(e, 'CLIENT')} value={password} name="password" type="password" placeholder="Password" />
              </InputGroup>

              <FormLabel>Phone</FormLabel>
              <InputGroup size="sm">
              <InputLeftAddon><Icon name={"phone"}/></InputLeftAddon>
                <Input onChange={(e) => signupInput(e, 'CLIENT')} value={phone} name="phone" type={'number'} placeholder="Phone number" />
              </InputGroup>

                <Flex direction="column" >
                  <FormLabel htmlFor="text" >Address</FormLabel>
                  <FormHelperText id="email-helper-text" p={0}>Your information will no be shared to anyone ever.</FormHelperText>
              <InputGroup size="sm">
                  <Input onChange={handleAddress} value={address.street} name="street" type="text" placeholder="Street" />
                  <Input onChange={handleAddress} value={address.neighborhood} name="neighborhood" type="text" placeholder="Neighborhood" />
                  <Input onChange={handleAddress} value={address.code} name="code" type="number" placeholder="Postal code" />
              </InputGroup>
                </Flex>
            </Stack>
            </FormControl>
            <Flex align='right'>
            <Button type="submit" size="sm" mt={3}>Submit</Button>
            </Flex>
       </Box>
    )
}

export default FormSubmit
