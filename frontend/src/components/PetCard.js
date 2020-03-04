import React from 'react'
import { Stack, Box, Heading, Button, FormControl, Flex, Image,
    FormLabel, Input, RadioGroup, Radio, Textarea, Icon, Text} from '@chakra-ui/core'
import EditPet from './EditPet'

const PetCard = ({state, createPet, pets, user, createPetInput, petFormData, deletePet, handleCreatePetInput, onClickCreatePetButton, createPetSubmit,
                edit, editButton, editInputs, formData, goBackEdit, handleInputsEdit, editSubmit, randomKey}) => {
    return (
        <Stack direction="column">
                    {user.pets.length === 0 ? (
                    <>
                        <Heading as="h3" size="md" color="yellow.600">You have no pets</Heading>
                    </>
                    ) : null }
                    {createPet ? (
                        <Box as="form" onSubmit={createPetSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Type in your pet's information</FormLabel>
                            <Input onChange={handleCreatePetInput} value={createPetInput.name} name="name" type="text" placeholder="Pet's Name"></Input>
                            <Input onChange={handleCreatePetInput} value={createPetInput.age} name="age" type="number" placeholder="Pet's Age"></Input>
                            <Textarea onChange={handleCreatePetInput} value={createPetInput.medicalHistory[0]} name="medicalHistory" placeholder="Write your pet's Medical History"/>
                            <FormLabel>Sex</FormLabel>
                            <RadioGroup name="sex" onChange={handleCreatePetInput} value={createPetInput.sex} isInline>
                                {petFormData.sex.map((el) => {
                                    return (
                                    <Radio value={el} key={el}>{el}</Radio>
                                    )
                                })}
                            </RadioGroup>
                            <Input onChange={handleCreatePetInput} value={createPetInput.breed} name="breed" type="text" placeholder="Your pet's breed"></Input>
                            <FormLabel>Sterilized</FormLabel>
                            <RadioGroup name="sterilized" onChange={handleCreatePetInput} value={createPetInput.sterilized} isInline>
                                {petFormData.sterilized.map((el) => {
                                    return (
                                    <Radio value={el} key={el}>{el}</Radio>
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <Button type="submit" variantColor="green">Create</Button>
                        </Box>
                    ) : edit ? (
                        <EditPet randomKey={randomKey} editButton={editButton} inputs={editInputs} formData={formData} goBackPet={goBackEdit} handle={handleInputsEdit} submit={editSubmit} variantColor="cyan"/>
                    ) : (
                        <Stack direction='column'>
                            {pets.map(el => {
                                return (
                            <Stack key={el._id} justify="space-around" align="center" direction="row" p={2} border='.5px solid rgba(198,198,198,.5)' borderRadius="10px">
                                <Image key={el.image} src={el.image} size="70px" mr={2} objectFit="cover"/>
                                <Flex align="center" direction="column">
                                 <Heading as="h5" fontSize="sm" pr={2} key={el.name}>{el.name.toUpperCase()}</Heading>
                                 <Text>{el.age} years</Text>
                                </Flex>
                                <Stack direction="column">
                                <Button key={el.index} name={el._id} onClick={editButton} size="sm" variantColor="cyan"><Icon name="edit" m={2}/></Button>
                                <Button name={el._id} onClick={deletePet} key={el.index} size="sm" variantColor="red"><Icon name="minus" m={2}/></Button>
                                </Stack>
                            </Stack>
                                )
                            })}
                        </Stack>
                    )}
                    {state.createPet ? (
                        <Button onClick={onClickCreatePetButton} m={3} variantColor="cyan">Back</Button>
                    ) : (
                        <Button onClick={onClickCreatePetButton} mt={3} size="sm" w='100%'><Icon name="add" m={2}/> New Pet</Button>
                    )}
                </Stack>
    )
}

export default PetCard
