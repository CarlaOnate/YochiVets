import React from 'react'
import { Heading, Button, Badge, Avatar } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const VetCard = ({name, image, specialty, animal, id}) => {
    return (
        <div>
            <Heading>{name}</Heading>
            <Avatar src={image}/>
            <Badge>{specialty}</Badge>
            <p>{animal}</p>
            <Button><Link to={`/make-appointment/${id}`}>Make Appointment</Link></Button>
        </div>
    )
}

export default VetCard
