import React from 'react'
import {
  Flex,
  Stack,
  Button
} from '@chakra-ui/core'
import FormSubmit from './FormSubmit'
import { MyContext } from '../context'



const Auth = () => {
    return (
    <MyContext.Consumer>
      {context => {
      console.log(context.handleAddress)
        return(
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Stack p={8} as="form" border="1px" borderRadius="md" borderColor="gray.200" h={'100%'} rounded textAlign={'start'}>
          <FormSubmit
            signupInput={context.handleSignupInput}
            handleAddress={context.handleAddress}
            state={context.state}
          />
          <Button type="submit" p={2} m={4}>Submit</Button>
        </Stack>
      </Flex>
      )
      }}

    </MyContext.Consumer>
    )
}

export default Auth
