import React from 'react';
import { Link } from 'react-router-dom'
import { Heading, Button, Stack, Text, Box, Image } from '@chakra-ui/core';

// url(https://res.cloudinary.com/dxxdamndt/image/upload/v1583256209/YochiVet/cats_and_dogs_oicomi.jpg
const style = {
  'background': 'url(https://res.cloudinary.com/dxxdamndt/image/upload/v1583256669/YochiVet/landing-background_dphbsd.png) no-repeat center center',
  'box-sizing': 'content-box',
  'background-size': 'cover',
  'margin': '0'
}


function Home() {
  return (
    <>
    <Stack justify='center' align="center" mt={0} pt={0}>
      <Stack w='100%' h='550px' textAlign='center' justify='center' align='flex-end' style={style} pb='10%'>
        <Heading as="h2" color='white' size="lg" pr='25%' >What is it?</Heading>
        <Text w="50%" color='white' pr='10%' >This is an app where you can finds vets to treat your pet from the comfort of you home. In here you can find any type of veterinarians
        , all of this veterinarians go trough a process to be able to announce themselves on the platform. </Text>
        <Text color='white' pr='5%'>We have vets that can treat several diseases, form heart worms to behaviour.</Text>
        <Link to="/signup" ><Button variant="outline" color='white' variantColor="grey" m={2} mr='150px'>Create your account and start now! It's free</Button></Link>
      </Stack>
      <Stack align="center" width="100%" direction="row" mt={0} pt={0} background="black">
        <Box width='50%' color="white" mt={0} pt={0}>
        <Heading as="h4" size="md">Are you a veterinarian and want to join?</Heading>
        <Link to="/register-vet"><Button rightIcon="arrow-forward" variant="outline" variantColor="grey" m={2}>Click here to register</Button></Link>
        </Box>
        <Box width='50%' mt={0} pt={0}>
          <Image src="https://res.cloudinary.com/dxxdamndt/image/upload/v1583257224/YochiVet/vet-white_tboeax.jpg"></Image>
        </Box>
      </Stack>
    </Stack>
    </>
  )
}

export default Home
