import React from 'react'
import {
  Flex,
  Stack
} from '@chakra-ui/core'
import FormSubmit from './FormSubmit'



const Auth = () => {
    return (
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Stack spacing={10} p={8} as="form" border="1px" borderRadius="md" borderColor="gray.200" h={'70vh'} rounded>
          <FormSubmit/>
        </Stack>
      </Flex>
    )
}

export default Auth
