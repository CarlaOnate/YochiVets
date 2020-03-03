import React from 'react'
import { Stack, Box, Image, Button, FormControl,
    FormLabel, Input, RadioGroup, Radio, Textarea, Icon} from '@chakra-ui/core'

const EditPet = ({ inputs, formData, goBackPet, handle, submit}) => {
    return (
        <Box as="form" onSubmit={submit} enctype="multipart/form-data">
            <Image src={inputs.image} w='40%' m={0}/>
            <Input onChange={handle} type='file' name='image'/>
        <FormControl isRequired>
            <FormLabel>Type in your pet's information</FormLabel>
            <Input onChange={handle} value={inputs.name} name="name" type="text" placeholder="Pet's Name"></Input>
            <Input onChange={handle} value={inputs.age} name="age" type="number" placeholder="Pet's Age"></Input>
            <Textarea onChange={handle} value={inputs.medicalHistory[0]} name="medicalHistory" placeholder="Write your pet's Medical History"/>
            <FormLabel>Sex</FormLabel>
            <RadioGroup onChange={handle} name="sex" value={inputs.sex} isInline>
                {formData.sex.map((el) => {
                    return (
                    <Radio value={el} key={el}>{el}</Radio>
                    )
                })}
            </RadioGroup>
            <Input onChange={handle} value={inputs.breed} name="breed" type="text" placeholder="Your pet's breed"></Input>
            <FormLabel>Sterilized</FormLabel>
            <RadioGroup onChange={handle} name="sterilized" value={inputs.sterilized} isInline>
                {formData.sterilized.map((el) => {
                    return (
                    <Radio value={el} key={el}>{el}</Radio>
                    )
                })}
            </RadioGroup>
        </FormControl>
        <Button onClick={goBackPet} >Go Back</Button>
        <Button type='submit'>Update</Button>
        </Box>
    )
}

export default EditPet
