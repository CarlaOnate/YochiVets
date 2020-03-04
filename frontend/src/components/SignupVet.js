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
    Flex,
    RadioButtonGroup
  } from '@chakra-ui/core'
  import { MyContext } from '../context'

const CustomRadio = React.forwardRef((props, ref) => {
    const { isChecked, isDisabled, value, ...rest } = props;
    return (
      <Button
        ref={ref}
        variantColor={isChecked ? "blue" : "gray"}
        aria-checked={isChecked}
        role="radio"
        isDisabled={isDisabled}
        {...rest}
      />
    )
})

const formData = {
  specialty: ['General Medicine', 'Behaviour', 'Cardiology', 'Neurology', 'Oncology', 'Nutrition'],
  typeofAnimal: ['Dogs', 'Cats', 'Ferrets', 'Birds', 'Exotic Animals'],
  possibleHours: ["8:00","10:00","13:00","15:00","17:00","19:00"]
}


const randomKey = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
    return v.toString(16);
  })
}


const SignupVet = () => {
    return (
    <MyContext.Consumer>
      {context => {
          const { signupVet: {name, email, password, phone, address, studies, availableHours, about, diploma}} = context.state
          const { handleSignupVet, handleVetAddress, handleStudiesInput, handleHoursInput, handleSpecialtyButtonInput, handleAnimalButtonInput } = context
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
                  {/* <RadioGroup m={3} name="specialty" key="0" onChange={handleStudiesInput} value={studies.specialty} isInline>
                <FormLabel><strong>Specialty</strong></FormLabel>
                    <Radio  key='' value="General Medicine">General Medicine</Radio>
                    <Radio  key=''  value="Behaviour">Behaviour</Radio>
                    <Radio  key=''  value="Cardiology">Cardiology</Radio>
                    <Radio  key=''  value="Neurology">Neurology</Radio>
                    <Radio  key=''  value="Oncology">Oncology</Radio>
                    <Radio  key=''  value="Nutrition">Nutrition</Radio>
                  </RadioGroup> */}
                  <RadioButtonGroup m={3} name="specialty" key={randomKey()} onChange={handleSpecialtyButtonInput} value={studies.specialty} isInline>
                  <FormLabel><strong>Specialty</strong></FormLabel>
                  {formData.specialty.map(el => {
                    return (
                      <CustomRadio size="sm" value={el} key={randomKey()}>{el}</CustomRadio>
                    )
                  })}
                  {console.log(studies.specialty)}
                  </RadioButtonGroup>
                </Stack>
                {/* <RadioGroup m={3} name="animal" key="animal" onChange={handleStudiesInput} value={studies.animal} isInline>
                <FormLabel><strong>Type of Animal</strong></FormLabel>
                    <Radio  key=''  name="animal" value="Dogs">Dogs</Radio>
                    <Radio  key=''  name="animal" value="Cats">Cats</Radio>
                    <Radio  key=''   name="animal" value="Ferrets">Ferrets</Radio>
                    <Radio  key=''   name="animal" value="Birds">Birds</Radio>
                    <Radio  key=''   name="animal" value="Exotic animals">Exotic animals</Radio>
                </RadioGroup> */}
                <RadioButtonGroup m={3} name="animal" key={randomKey()} onChange={handleAnimalButtonInput} value={studies.animal} isInline>
                <FormLabel><strong>Type of Animal</strong></FormLabel>
                  {formData.typeofAnimal.map(el => {
                    return (
                      <CustomRadio size="sm" value={el} key={randomKey()}>{el}</CustomRadio>
                    )
                  })}
                  {console.log(studies.animal)}
                  </RadioButtonGroup>
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
                key={randomKey()}
                onChange={handleHoursInput}
                name="availableHours"
                value={availableHours}
                isInline
                spacing={8}>
                {formData.possibleHours.map(el => {
                  return (
                    <Checkbox key={randomKey()} value={el}>{el}</Checkbox>
                  )
                })}
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
