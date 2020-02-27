import React from 'react'
import {
  Flex,
  Stack,
} from '@chakra-ui/core'
import FormSubmit from './FormSubmit'
import { MyContext } from '../context'



const Auth = () => {
    return (
    <MyContext.Consumer>
      {context => {
        return(
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Stack  p={8} border="1px" borderRadius="md" borderColor="gray.200" h={'100%'} rounded textAlign={'start'}>
          <FormSubmit
            submit={context.signupSubmit}
            signupInput={context.handleSignupInput}
            handleAddress={context.handleAddress}
            state={context.state}
          />
         </Stack>
      </Flex>
      )
      }}

    </MyContext.Consumer>
    )
}

export default Auth
