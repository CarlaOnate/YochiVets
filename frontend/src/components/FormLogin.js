import React from 'react'
import {
    FormControl,
    InputGroup,
    InputLeftAddon,
    Input,
    Icon,
    FormLabel,
    Heading,
    Button,
    Box
  } from '@chakra-ui/core'

const FormLogin = ({handleLogin, submit, state}) => {
    const {loginForm: {email, password}} = state
    return (
        <Box onSubmit={submit} as="form" >
        <FormControl isRequired >
          <Heading>Login</Heading>
              <FormLabel >Email</FormLabel>
            <InputGroup size="sm">
              <InputLeftAddon><Icon name="email"/></InputLeftAddon>
              <Input onChange={handleLogin} value={email} name="email" type="email" placeholder="Email"/>
            </InputGroup>

              <FormLabel>Password</FormLabel>
                <Input size="sm" onChange={handleLogin} value={password} name="password" type="password" placeholder="Password"/>
              <Button size="sm" type="submit" mt={3}>Login</Button>
        </FormControl>
        </Box>
    )
}

export default FormLogin
