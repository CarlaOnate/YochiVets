import React from 'react'
import { Stack, Box, Image, List, ListItem, Heading, Button, FormControl,
    FormLabel, Input, Flex, Text, ListIcon } from '@chakra-ui/core'

const UserProfile = ({user, edit, editInput, handleEditUserInputs, handleAddressEditInputs, editProfile, editSubmit, goBackEdit}) => {
    return (
        <>
        {!edit ? (
            <Stack>
            <Box p={5} textAlign='center'>
            <Image src={user.image} w='40%' m={0}/>
            <List>
                <ListItem>
                    <Flex direction="row" align="center">
                        <Heading as="h6" size="sm">NAME:</Heading><Text> {user.name}</Text>
                    </Flex>
                </ListItem>
                <ListItem>
                    <Flex direction="row" align="center">
                        <Heading as="h6" size="sm">EMAIL:</Heading>
                        <Text>{user.email}</Text>
                    </Flex>
                </ListItem>
                <ListItem>
                <Flex direction="row" align="center">
                    <Heading as="h6" size="sm">PHONE:</Heading>
                    <Text>{user.phone}</Text>
                </Flex>
                </ListItem>
                <Flex align="center" direction="column">
                     <Heading as="h6" size="sm">ADDRESS: </Heading>
                        <Flex align="center" direction="column">
                        {Object.entries(user.address).map((el, index) => {
                          return (
                            <ListItem key={index}>{el[0].charAt(0).toUpperCase()}{el[0].slice(1, el[0].length)} : {el[1]}</ListItem>
                          )
                        })}
                        </Flex>
                </Flex>
            </List>
            <Button onClick={editProfile}>Edit Profile</Button>
            </Box>
            </Stack>
            ) : (
            <Stack direction='row' justify='space-between'>
            <Box p={5} as='form' type='' textAlign='center' enctype="multipart/form-data">
            <FormControl >
            <Image src={user.image} w='40%' m={0}/>
            <Input onChange={handleEditUserInputs} type='file' name='image'/>
            <List>
                <ListItem><Heading >Name:</Heading><Input  onChange={handleEditUserInputs} name='name' value={editInput.name}/></ListItem>
                <ListItem><Heading>Email:</Heading><Input onChange={handleEditUserInputs} name='email' value={editInput.email}/></ListItem>
                <ListItem><Heading>Phone:</Heading><Input onChange={handleEditUserInputs} name='phone' value={editInput.phone}/></ListItem>
                <Flex direction="column" h='100%'>
                    <FormLabel htmlFor="text" >Address</FormLabel>
                    <Input onChange={handleAddressEditInputs} value={editInput.address.street} name="street" type="text" />
                    <Input onChange={handleAddressEditInputs} value={editInput.address.neighborhood} name="neighborhood" type="text" />
                    <Input onChange={handleAddressEditInputs} value={editInput.address.code} name="code" type="number"/>
                </Flex>
            </List>
            </FormControl>
            <Button onClick={goBackEdit}>Go Back</Button>
            <Button type='submit' onClick={editSubmit}>Save</Button>
            </Box>
            </Stack>
            )}
            </>
    )
}

export default UserProfile
