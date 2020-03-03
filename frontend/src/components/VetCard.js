import React from 'react'
import { Heading, Button, Avatar, Text, Box } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const colors = {
    'General Medicine': 'blue.600',
    'Behaviour': 'teal.600',
    'Cardiology': 'red.600',
    'Neurology': 'purple.600',
    'Oncology': 'pink.600',
    'Nutrition': 'orange.600'
}

const chooseColor = (specialty) => {
    for(const key in colors){
        console.log(key, specialty)
        if (key === specialty) return colors[key]
    }
}

const VetCard = ({name, image, specialty, animal, id, address}) => {
    return (
        <div>
        <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
            <Box p="4" fontSize="sm" letterSpacing="wide" color="white" height="25%" backgroundColor={chooseColor(specialty)} >
            <Heading as="h3" size="md">{specialty}</Heading>
            </Box>
            <Heading p="4" as="h4" size="md" color="gray.700">{name}</Heading>
            <Box >
            <Avatar src={image}/>
            </Box>
            <Text p="2" fontSize="md">{animal}</Text>
            <Text p="2" fontSize="md">{address.neighborhood}</Text>
            <Button width="100%"><Link to={`/make-appointment/${id}`}>Make Appointment</Link></Button>
            </Box>
        </div>
    )
}

export default VetCard
