import React from 'react'
import { Stack, Box, Image, List, ListItem, Heading, Button, FormControl,
    FormLabel, Input, Flex, Text } from '@chakra-ui/core'

const UserProfile = ({user, edit, editInput, handleEditUserInputs, handleAddressEditInputs, editProfile, editSubmit, goBackEdit}) => {
    return (
        <>
        {!edit ? (
            <Stack>
            <Box p={5} textAlign='center' backgroundColor="gray.100" borderRadius="10px">
            <Heading as="h3" size="lg" mb={3}>Profile</Heading>
            <Image src={user.image} w='40%' ml='auto' mr='auto' mb={5}/>
            <List>
                <ListItem>
                    <Flex direction="row" align="center">
                        <Heading as="h6" size="xs" pr={3} >NAME</Heading>
                        <Text ml={6}> {user.name}</Text>
                    </Flex>
                </ListItem>
                <ListItem>
                    <Flex direction="row" align="center">
                        <Heading as="h6" size="xs" pr={3}>EMAIL:</Heading>
                        <Text ml={6}>{user.email}</Text>
                    </Flex>
                </ListItem>
                <ListItem>
                <Flex direction="row" align="center">
                    <Heading as="h6" size="xs" pr={3}>PHONE:</Heading>
                    <Text ml={6}>{user.phone}</Text>
                </Flex>
                </ListItem>
                <Flex align="start" direction="row">
                     <Heading as="h6" size="xs">ADDRESS: </Heading>
                        <Flex align="start" direction="column" >
                        {Object.entries(user.address).map((el, index) => {
                          return (
                            <ListItem  ml={6} key={index}>{el[1]}</ListItem>
                          )
                        })}
                        </Flex>
                </Flex>
            </List>
            <Button onClick={editProfile} size="sm" variantColor="teal"  mt={4}>Edit Profile</Button>
            </Box>
            </Stack>
            ) : (
            <Stack direction='row' justify='space-between'>
            <Box p={5} as='form' type='' textAlign='start' enctype="multipart/form-data" backgroundColor="gray.100" borderRadius="10px">
            <FormControl isRequired>
            <Image src={user.image} w='40%' m={0}/>
            <Input onChange={handleEditUserInputs} type='file' name='image'/>
            <List>
                <ListItem><FormLabel>Name:</FormLabel><Input onChange={handleEditUserInputs} name='name' value={editInput.name} size="sm"/></ListItem>
                <ListItem><FormLabel>Email:</FormLabel><Input onChange={handleEditUserInputs} name='email' value={editInput.email} size="sm"  /></ListItem>
                <ListItem><FormLabel>Phone:</FormLabel><Input onChange={handleEditUserInputs} name='phone' value={editInput.phone} size="sm"  /></ListItem>
                <Flex direction="column" h='100%'>
                    <FormLabel htmlFor="text">Address</FormLabel>
                    <Input onChange={handleAddressEditInputs} value={editInput.address.street} name="street" type="text" size="sm"/>
                    <Input onChange={handleAddressEditInputs} value={editInput.address.neighborhood} name="neighborhood" type="text" size="sm"/>
                    <Input onChange={handleAddressEditInputs} value={editInput.address.code} name="code" type="number" size="sm"/>
                </Flex>
            </List>
            </FormControl>
            <Button onClick={goBackEdit} size="md" variantColor="cyan" mt={2} mr={2}>Go Back</Button>
            <Button type='submit' onClick={editSubmit} size="md" variantColor="teal" mt={2}>Save</Button>
            </Box>
            </Stack>
            )}
            </>
    )
}

export default UserProfile
