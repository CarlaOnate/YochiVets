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
    FormHelperText,
    RadioGroup,
    Radio,
    Stack,
    Checkbox,
    CheckboxGroup,
    Textarea,
    FormControl
  } from '@chakra-ui/core'
  import { MyContext } from '../context'


const SignupVet = () => {
    return (
    <MyContext.Consumer>
      {context => {
          const { signupVet: {name, email, password, phone, address, studies, availableHours, about, diploma}} = context.state
          const { handleSignupVet, handleVetAddress, handleStudiesInput, handleHoursInput } = context
          return (
          <Box onSubmit={context.signupVetSubmit} as="form" key='signupVetFormKey' enctype="multipart/form-data">
          <FormControl isRequired>
          {context.state.counter <= 0 ? (
        <>
          <Heading>First enter your name email and password:</Heading>
            <Heading>Signup</Heading>
              <FormLabel htmlFor="text">Full name</FormLabel>
              <Input onChange={handleSignupVet} value={name} name="name" type="text" placeholder="Full name"/>

              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="email"/></InputLeftAddon>
                <Input onChange={handleSignupVet} value={email} name="email" type="email" placeholder="Email" />
              </InputGroup>

              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name=""/></InputLeftAddon>
                <Input onChange={handleSignupVet} value={password} name="password" type="password" placeholder="Password" />
              </InputGroup>

              <FormLabel>Phone number</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="phone"/></InputLeftAddon>
                <Input onChange={handleSignupVet} value={phone} name="phone" type="number" placeholder="Phone number" />
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
                <Input onChange={handleVetAddress} value={address.street} name="street" type="text" placeholder="Street and number" />
                <Input onChange={handleVetAddress} value={address.neighborhood} name="neighborhood" type="text" placeholder="Col." />
                <Input onChange={handleVetAddress} value={address.code} name="code" type="text" placeholder="Postal Code" />
              </InputGroup>
            <Button onClick={(e) => context.handleCounter(e)}> Go Back</Button>
            <Button onClick={(e) => context.handleCounter(e, 'add')}> Next Step</Button>
        </>
        ) : context.state.counter === 2 ? (
        <>
            <Heading>Studies</Heading>
            <FormLabel>Cedula Profesional</FormLabel>
                <Input onChange={handleStudiesInput} value={studies.cedula} name="cedula" type="text" placeholder="ID number (cédula profesional)" />
                <Stack spacing={3}>
                {/* onChange={} value={}*/}
                  <RadioGroup name="specialty" key="0" onChange={handleStudiesInput} value={studies.specialty} isInline>
                    <Radio  key="1" value="General Medicine">General Medicine</Radio>
                    <Radio  key="2"  value="Behaviour">Behaviour</Radio>
                    <Radio  key="3"  value="Cardiology">Cardiology</Radio>
                    <Radio  key="4"  value="Neurology">Neurology</Radio>
                    <Radio  key="5"  value="Oncology">Oncology</Radio>
                    <Radio  key="6"  value="Nutrition">Nutrition</Radio>
                    <FormLabel>Other</FormLabel>
                    {/* <Input name="specialty" value={studies.specialty} type="text" placeholder="type here your specialty"/> */}
                  </RadioGroup>
                </Stack>
                <RadioGroup name="animal" key="animal" onChange={handleStudiesInput} value={studies.animal} isInline>
                    <Radio  key="7" name="animal" value="Dogs">Dogs</Radio>
                    <Radio  key="8" name="animal" value="Cats">Cats</Radio>
                    <Radio  key="10" name="animal" value="Ferrets">Ferrets</Radio>
                    <Radio  key="11" name="animal" value="Birds">Birds</Radio>
                    <Radio  key="12" name="animal" value="Exotic animals">Exotic animals</Radio>
                    <FormLabel>Other</FormLabel>
                    {/* <Input name="animal" type="text" value={studies.animal} placeholder="what animal can you treat?"/> */}
                </RadioGroup>
                  <FormLabel>Where did you study?</FormLabel>
                <Input onChange={handleStudiesInput} value={studies.university} name="university" type="university" placeholder="Where did you study?" />
                  <FormLabel>Upload a picture of your diploma</FormLabel>
                <Input onChange={handleSignupVet} value={diploma} name="diploma" type="file"/>
            <Button onClick={(e) => context.handleCounter(e)}>Go Back</Button>
            <Button onClick={(e) => context.handleCounter(e, 'add')}> Next Step</Button>
        </>
        ) : (
          <>
        <Heading>Some personal information</Heading>
        <FormHelperText p={0}>Your information will no be shared to anyone ever.</FormHelperText>
            <FormLabel>Tell us about yourself</FormLabel>
              <Textarea onChange={handleSignupVet} value={about} name="about" placeholder="Tell us about yourself"/>
              <CheckboxGroup
               key="signuphours"
               onChange={handleHoursInput}
                name="availableHours"
                value={availableHours}
                isInline
                spacing={8}>
                <Checkbox key="8:00" value="8:00">8:00</Checkbox>
                <Checkbox key="10:00" value="10:00">10:00</Checkbox>
                <Checkbox key="13:00" value="13:00">13:00</Checkbox>
                <Checkbox key="15:00" value="15:00">15:00</Checkbox>
                <Checkbox key="17:00" value="17:00">17:00</Checkbox>
                <Checkbox key="19:00" value="19:00">19:00</Checkbox>
              </CheckboxGroup>
            <Button onClick={(e) => context.handleCounter(e)}> Go Back</Button>
            <Button type="submit">Continue</Button>

        </>
        )}
        </FormControl>
        </Box>
        )}}
      </MyContext.Consumer>

)}

export default SignupVet
