import React, { Component } from 'react'
import VetCard from './VetCard'
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
    Stack,
    Spinner
  } from '@chakra-ui/core'
  import { getAllVetsAPI} from '../services'

export default class FindVets extends Component {
    state = {
      vets: [],
      spinner: true
    }

    componentDidMount = () => {
      this.getAllVets()
      this.setState({spinner: false})
    }

    getAllVets = async () => {
        let {data} = await getAllVetsAPI()
        this.setState({vets: data})
    }

    render() {
      console.log(this.state.spinner)
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
            <Stack>
            {this.state.spinner ? (<Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />) : this.state.vets.map(el => {
              return (
              <VetCard key={el._id} name={el.name}
              image={el.image} specialty={el.studies.specialty}
              animal={el.studies.animal}/>)
            })}
            </Stack>
            </div>
        )
    }
}
