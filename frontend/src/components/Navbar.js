import React from 'react'
import { MyContext } from '../context'
import { NavLink } from 'react-router-dom'
import { Flex, Button, Image } from '@chakra-ui/core'

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
    <MyContext.Consumer>
    {context => {
        return (
        <Flex as="nav" justify='space-between' direction='row' style={navStyle}>
            <Image src='/veterinary.svg' alt="logo" ml={2} w='30px'/>
            <div style={linkStyle}>
            <NavLink exact to="/"><Button variantColor="blue" size='sm'>Home</Button></NavLink>
            <NavLink exact to="/findVets" bg=''><Button size="sm" variant="link">Find Vets</Button></NavLink>
            {context.state.showNav ? (
            <>
             <NavLink exact to="/profile"><Button variant="link">Profile</Button></NavLink>
             <Button variantColor="red" variant="outline" onClick={context.logoutSubmit} size="sm">Logout</Button>
             </>) :
             <NavLink exact to="/signup"><Button variantColor="blue" variant="outline" size="sm">Signup - Login</Button></NavLink>}
            </div>
        </Flex>)}}
    </MyContext.Consumer>
    )
}

export default Navbar
