import React from 'react'
import { Stack, Box, Avatar, Heading, Button, FormControl,
    FormLabel, Input, RadioGroup, Radio, Textarea, Icon} from '@chakra-ui/core'

const PetCard = ({state, createPet, pets, user, createPetInput, petFormData, deletePet, handleCreatePetInput, onClickCreatePetButton, createPetSubmit}) => {
    return (
        <Stack direction="column">
                    {user.pets.length === 0 ? (
                    <>
                        <Heading>You have no pets</Heading>
                    </>
                    ) :null }
                    {createPet === false ? (
                        <Stack direction='row'>
                        {pets.map((el, index) => {
                            return (
                        <Stack key={el._id} >
                        <Avatar key={el.image} src={el.image}></Avatar>
                        <p key={el.name}>{el.name}: {el.age} years</p>
                        <Stack direction="row">
                        <Button key={el.index}><Icon name="view" m={2}/> MSF</Button>
                        <Button name={el._id} onClick={deletePet} key={el.index}><Icon name="minus" m={2}/></Button>
                        </Stack>
                        </Stack>
                            )
                        })}
                        </Stack>
                    ) : (
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
                        <Button type="submit" >Create</Button>
                        </Box>
                    )}
                    {state.createPet ? (
                        <Button onClick={onClickCreatePetButton} m={3}>Back</Button>
                    ) : (
                        <Button onClick={onClickCreatePetButton} m={3}><Icon name="add" m={2}/> New Pet</Button>
                    )}
                </Stack>
    )
}

export default PetCard
