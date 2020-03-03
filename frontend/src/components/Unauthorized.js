import React from 'react'
import { Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const Unauthorized = ({msg}) => {
    return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      height="100vh"
    >
      <AlertIcon size="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Login to {msg}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Link to="/signup"><Button >Click here to login</Button></Link>
      </AlertDescription>
    </Alert>
    )
}

export default Unauthorized
