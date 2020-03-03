import React, { Component } from 'react'
import VetCard from './VetCard'
import {
    FormLabel,
    Heading,
    Radio,
    RadioGroup,
    Button,
    Box,
    Stack,
    Spinner
  } from '@chakra-ui/core'
  import { getAllVetsAPI } from '../services'

export default class FindVets extends Component {
    state = {
      vets: [],
      spinner: true,
      noneFound: false,
      searchInput: {
        specialty: ''
      },
      specialtyForm: ['General Medicine','Behaviour', 'Cardiology', 'Neurology', 'Oncology', 'Nutrition']
    }

    componentDidMount = async () => {
      await this.getAllVets()
      this.setState({spinner: false})
    }

    getAllVets = async () => {
        let { data } = await getAllVetsAPI()
        this.setState({ vets: data.vets })
    }

    handleSearchInput = async (e) => {
      const {name, value} = e.target
      this.setState((prevState) =>  ({
        ...prevState,
        searchInput: {
          ...prevState.searchInput,
          [name]: value
        }
      }))
    }

    searchCheckboxSubmit = async (e) => {
      e.preventDefault()
      let filtered = []
      this.state.vets.forEach(el => {
        if(el.studies.specialty === this.state.searchInput.specialty) return filtered.push(el)
      })
      if(filtered.length === 0) return this.setState({noneFound: true})
      this.setState({vets: filtered})
    }

    backSearch = async () => {
      await this.getAllVets()
      this.setState({spinner: false, noneFound: false})
    }

    render() {
      let { vets, spinner, noneFound,  searchInput: {specialty} } = this.state
        return (
            <div>
            <Heading>Find Vets</Heading>
              <Stack m={4} direction="row" justify="space-around">
              <Box onSubmit={this.searchCheckboxSubmit} as="form">
              <FormLabel>Search by specialty</FormLabel>
              <RadioGroup onChange={this.handleSearchInput} value={specialty} name="specialty" isInline>
              {this.state.specialtyForm.map(el => {
                return (
                    <Radio key={el} value={el}>{el}</Radio>
                )
              })}
               </RadioGroup>
               <Button onClick={this.backSearch} type="submit">Back</Button>
               <Button type="submit">Search</Button>
              </Box>
            </Stack>
            <Stack direction="row" justify="space-around" wrap>
            {spinner ? (<Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />) : noneFound ? (
              <Heading>No vets were found</Heading>
            ) : vets.map(el => {
              return (
              <VetCard p={5} key={el._id} name={el.name}
              image={el.image} specialty={el.studies.specialty}
              animal={el.studies.animal} id={el._id} />)
            })}
            </Stack>
            </div>
        )
    }
}
