import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, Button } from '@chakra-ui/core'

const linkStyle = {
    display: 'flex',
    width: '30vw',
    justifyContent: 'space-around'
}

const navStyle = {
    margin: '1%',
    height: '10%'
}

const Navbar = () => {
    return (
        <Flex as="nav" justify='space-between' direction='row' style={navStyle}>
            <div>
                {/* logo */}
            </div>
            <div style={linkStyle}>
            <NavLink exact to="/"><Button variantColor="blue" size='sm'>Home</Button></NavLink>
            <NavLink exact to="/findVets" bg=''>Find Vets</NavLink>
            <NavLink exact to="/client/signup">Signup - Login</NavLink>
            <NavLink exact to="/client/logout">Logout</NavLink>
            </div>
        </Flex>
    )
}

export default Navbar
