import React, { Component } from 'react'
import {
    InputGroup,
    InputLeftAddon,
    Input,
    Icon,
    FormLabel,
    Heading,
    Radio,
    RadioGroup,
    Button,
    Box,
    FormHelperText,
    Stack,
  } from '@chakra-ui/core'
  import { } from '../services'

export default class FindVets extends Component {
    state = {
        vets: [],
    }

    getAllVets = async () => {
        
    }

    render() {
        return (
            <div>
            <Heading>Find Vets</Heading>
            <Box as="form">
            <FormLabel>Search</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="search"/></InputLeftAddon>
                <Input name="search" type="text" placeholder="Search" />
              </InputGroup>
              <FormLabel>Search by specialty</FormLabel>
              <RadioGroup name="specialty" key="0" isInline>
                    <Radio  key="1" value="General Medicine">General Medicine</Radio>
                    <Radio  key="2"  value="Behaviour">Behaviour</Radio>
                    <Radio  key="3"  value="Cardiology">Cardiology</Radio>
                    <Radio  key="4"  value="Neurology">Neurology</Radio>
                    <Radio  key="5"  value="Oncology">Oncology</Radio>
                    <Radio  key="6"  value="Nutrition">Nutrition</Radio>
               </RadioGroup>
               <Button type="submit">Search</Button>
            </Box>
              

            </div>
        )
    }
}
