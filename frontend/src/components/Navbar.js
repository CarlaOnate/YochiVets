import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flex } from '@chakra-ui/core'

const Navbar = () => {
    return (
        <Flex as="nav">
            <NavLink exact to="/client/signup">Signup - Login</NavLink>
            <NavLink exact to="/client/logout">Logout</NavLink>
        </Flex>
    )
}

export default Navbar
