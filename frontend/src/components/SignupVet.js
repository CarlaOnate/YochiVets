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
    FormControl,
    Flex
  } from '@chakra-ui/core'
  import { MyContext } from '../context'


const SignupVet = () => {
    return (
    <MyContext.Consumer>
      {context => {
          const { signupVet: {name, email, password, phone, address, studies, availableHours, about, diploma}} = context.state
          const { handleSignupVet, handleVetAddress, handleStudiesInput, handleHoursInput } = context
          return (
        <Flex direction="column" align="center">
          <Box onSubmit={context.signupVetSubmit} as="form" key='signupVetFormKey' enctype="multipart/form-data">
          <FormControl isRequired>
          {context.state.counter <= 0 ? (
        <>
          <Flex justify='center' align="center">
            <Heading as="h2" size="xl" w='100%'>Create your account:</Heading>
          </Flex>
            <Flex direction="column" align="center" justify="center">
            <Heading as="h2" size="lg" m={3}>Signup</Heading>
              <FormLabel htmlFor="text" alignSelf="start" mt={5} >Full name</FormLabel>
              <Input onChange={handleSignupVet} value={name} name="name" type="text" placeholder="Full name"/>

              <FormLabel htmlFor="email" alignSelf="start" mt={5}>Email</FormLabel>
              <InputGroup w="100%">
                <InputLeftAddon><Icon name="email"/></InputLeftAddon>
                <Input onChange={handleSignupVet} value={email} name="email" type="email" placeholder="Email" />
              </InputGroup>

              <FormLabel htmlFor="password" alignSelf="start" mt={5}>Password</FormLabel>
              <InputGroup w="100%">
                <InputLeftAddon><Icon name=""/></InputLeftAddon>
                <Input onChange={handleSignupVet} value={password} name="password" type="password" placeholder="Password" />
              </InputGroup>

              <FormLabel alignSelf="start" mt={5}>Phone number</FormLabel>
              <InputGroup w="100%">
                <InputLeftAddon><Icon name="phone"/></InputLeftAddon>
                <Input onChange={handleSignupVet} value={phone} name="phone" type="number" placeholder="Phone number" />
              </InputGroup>
              <Button onClick={(e) => context.handleCounter(e, 'add')} mt={5} variantColor="blue">Next Step</Button>
              </Flex>
        </>
        ) : context.state.counter === 1 ? (
        <>
        <Heading as="h2" size="lg" m={5}>Some personal information</Heading>
        <FormHelperText p={0}>Your information will no be shared to anyone ever.</FormHelperText>
            <FormLabel m={3}>Address</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="info"/></InputLeftAddon>
                <Input onChange={handleVetAddress} value={address.street} name="street" type="text" placeholder="Street and number" />
                <Input onChange={handleVetAddress} value={address.neighborhood} name="neighborhood" type="text" placeholder="Col." />
                <Input onChange={handleVetAddress} value={address.code} name="code" type="text" placeholder="Postal Code" />
              </InputGroup>
            <Button onClick={(e) => context.handleCounter(e)} m={5} variantColor='cyan'> Go Back</Button>
            <Button onClick={(e) => context.handleCounter(e, 'add')} m={5} variantColor="blue">Next Step</Button>
        </>
        ) : context.state.counter === 2 ? (
          <>
            <Heading as="h2" size="lg" m={5}>Studies</Heading>
            <Flex textAlign="start" direction="column">
            <FormLabel mt={3}><strong>Cedula</strong></FormLabel>
                <Input onChange={handleStudiesInput} value={studies.cedula} name="cedula" type="text" placeholder="ID number (cédula profesional)" />
                <Stack spacing={3}>
                  <RadioGroup m={3} name="specialty" key="0" onChange={handleStudiesInput} value={studies.specialty} isInline>
                <FormLabel><strong>Specialty</strong></FormLabel>
                    <Radio  key="1" value="General Medicine">General Medicine</Radio>
                    <Radio  key="2"  value="Behaviour">Behaviour</Radio>
                    <Radio  key="3"  value="Cardiology">Cardiology</Radio>
                    <Radio  key="4"  value="Neurology">Neurology</Radio>
                    <Radio  key="5"  value="Oncology">Oncology</Radio>
                    <Radio  key="6"  value="Nutrition">Nutrition</Radio>
                  </RadioGroup>
                </Stack>
                <RadioGroup m={3} name="animal" key="animal" onChange={handleStudiesInput} value={studies.animal} isInline>
                <FormLabel><strong>Type of Animal</strong></FormLabel>
                    <Radio  key="7" name="animal" value="Dogs">Dogs</Radio>
                    <Radio  key="8" name="animal" value="Cats">Cats</Radio>
                    <Radio  key="10" name="animal" value="Ferrets">Ferrets</Radio>
                    <Radio  key="11" name="animal" value="Birds">Birds</Radio>
                    <Radio  key="12" name="animal" value="Exotic animals">Exotic animals</Radio>
                </RadioGroup>
                  <FormLabel mt={3}><strong>University</strong></FormLabel>
                <Input onChange={handleStudiesInput} value={studies.university} name="university" type="university" placeholder="Where did you study?" />
                  <FormLabel mt={3}><strong>Picture of diploma</strong></FormLabel>
                <Input onChange={handleSignupVet} value={diploma} name="diploma" type="file"/>
            <Flex direction="row" mt={4} justify="center">
              <Button onClick={(e) => context.handleCounter(e)} variantColor='cyan' mr={3}>Go Back</Button>
              <Button onClick={(e) => context.handleCounter(e, 'add')} variantColor='blue' mr={3}> Next Step</Button>
            </Flex>
        </Flex>
        </>
        ) : (
          <>
        <Heading as="h2" size="lg" mt={5}>Some personal information</Heading>
        <Box textAlign="start">
        <FormHelperText p={0}>Your information will no be shared to anyone ever.</FormHelperText>
            <FormLabel mt={3}>Tell us about yourself</FormLabel>
              <Textarea onChange={handleSignupVet} value={about} name="about" placeholder="Tell us about yourself"/>
            <FormLabel mt={3}>Available Hours</FormLabel>
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
            <Button onClick={(e) => context.handleCounter(e)} mr={2} mt={4} variantColor='cyan'> Go Back</Button>
            <Button type="submit" variantColor='green' mt={4}>Continue</Button>
        </Box>
        </>
        )}
        </FormControl>
        </Box>
        </Flex>
        )}}
      </MyContext.Consumer>

)}

export default SignupVet
