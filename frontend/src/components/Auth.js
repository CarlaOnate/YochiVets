import React from 'react'
import {
  Flex,
  Stack,
} from '@chakra-ui/core'
import FormSubmit from './FormSubmit'
import { MyContext } from '../context'
import FormLogin from './FormLogin'



const Auth = () => {
    return (
    <MyContext.Consumer>
      {context => {
        return(
      <Flex align="top" width="100%" justify="center">
        <Stack width='50%' p={8} rounded textAlign={'start'}>
          <FormSubmit
            submit={context.signupSubmit}
            signupInput={context.handleSignupInput}
            handleAddress={context.handleAddress}
            state={context.state}
          />
         </Stack>
        <Stack width='50%' p={8} rounded textAlign={'start'}>
          <FormLogin
            submit={context.loginSubmit}
            handleLogin={context.handleLogin}
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
