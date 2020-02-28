import React from 'react'
import { Heading, Button } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const VetCard = ({name, image, specialty, animal}) => {
    return (
        <div>
            <Heading>{name}</Heading>
            <img src={image}/>
            <p>Specialty: {specialty}</p>
            <p>Type of Animal: {animal}</p>
            <Button><Link exact to="">Make Appointment</Link></Button>
        </div>
    )
}

export default VetCard
