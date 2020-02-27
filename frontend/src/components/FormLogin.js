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
        <Box onSubmit={submit} as="form" h='100%'>
        <FormControl isRequired h={'100%'} justifyContent="spaceAround">
          <Heading>Login</Heading>
            <InputGroup h='50%'>
              <FormLabel htmlFor="text" h='10%'>Email</FormLabel>
              <InputLeftAddon><Icon name="email"/></InputLeftAddon>
              <Input onChange={handleLogin} value={email} name="email" type="text" placeholder="Email"/>
            </InputGroup>

              <FormLabel htmlFor="email">Password</FormLabel>
                <Input onChange={handleLogin} value={password} name="password" type="password" placeholder="Password"/>
              <Button type="submit" p={2} m={4}>Login</Button>
        </FormControl>
        </Box>
    )
}

export default FormLogin
