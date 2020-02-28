import React from 'react'
import {
    InputGroup,
    InputLeftAddon,
    Input,
    Icon,
    FormLabel,
    Heading,
    Button,
    Box,
    FormHelperText
  } from '@chakra-ui/core'
  import { MyContext } from '../context'


const SignupVet = () => {
    return (
    <MyContext.Consumer>
      {context => {
          console.log(context.state)
          return (
          <Box onSubmit={context.signupVetSubmit} as="form" enctype="multipart/form-data">
          {context.state.counter <= 0 ? (
        <>
            <Heading>First enter your name email and password:</Heading>
            <Heading>Signup</Heading>
              <FormLabel htmlFor="text">Full name</FormLabel>
              <Input name="name" type="text" placeholder="Full name"/>

              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="email"/></InputLeftAddon>
                <Input name="email" type="email" placeholder="Email" />
              </InputGroup>

              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name=""/></InputLeftAddon>
                <Input name="password" type="password" placeholder="Password" />
              </InputGroup>

              <FormLabel htmlFor="password">Phone number</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="phone"/></InputLeftAddon>
                <Input name="phone" type="number" placeholder="Phone number" />
              </InputGroup>
              <Button onClick={(e) => context.handleCounter(e, 'add')}>Next Step</Button>
        </>
        ) : context.state.counter === 1 ? (
        <>
        <Heading>Some personal information</Heading>
        <FormHelperText p={0}>Your information will no be shared to anyone ever.</FormHelperText>
            <FormLabel>Address</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="info"/></InputLeftAddon>
                <Input name="street" type="text" placeholder="Street and number" />
                <Input name="neighborhood" type="text" placeholder="Col." />
                <Input name="code" type="text" placeholder="Postal Code" />
              </InputGroup>
            <Button onClick={(e) => context.handleCounter(e, 'sub')}> Go Back</Button>
            <Button onClick={(e) => context.handleCounter(e, 'add')}> Next Step</Button>
        </>
        ) : (
        <>
            <Heading>Studies</Heading>
            <FormLabel>Studies</FormLabel>
                <Input name="cedula" type="text" placeholder="ID number (cédula profesional)" />
                <Heading>poner un sellect en specialty</Heading>
                <Input name="specialty" type="text" placeholder="Specialty" />
                <Heading>poner un sellect en animal to treat</Heading>
                <Input name="typeAnimal" type="text" placeholder="What type of animal do you treat?" />
                <Input name="university" type="university" placeholder="Where did you study?" />
                <Heading>Algo mas bonito para el input de file</Heading>
                <Input name="diploma" type="file" placeholder="Take a picture of your diploma" />
              <Button onClick={(e) => context.handleCounter(e, 'sub')}>Go Back</Button>
              <Button type="submit">Continue</Button>
        </>
        )}
        </Box>
        )}}
      </MyContext.Consumer>

)}

export default SignupVet
