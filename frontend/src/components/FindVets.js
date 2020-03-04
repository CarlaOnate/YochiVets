import React, { Component } from 'react'
import VetCard from './VetCard'
import {
    FormLabel,
    Heading,
    Button,
    Box,
    Stack,
    Spinner,
    Text,
    RadioButtonGroup
  } from '@chakra-ui/core'
  import { getAllVetsAPI } from '../services'

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

    handleSearchInput = async (val) => {
      this.setState((prevState) =>  ({
        ...prevState,
        searchInput: {
          ...prevState.searchInput,
          specialty: val
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
            <Stack>
            <Heading as="h3" alignSelf='start' ml='5%'>Find Vets</Heading>
              <Stack m={4} direction="row" justify="space-around">
              <Box onSubmit={this.searchCheckboxSubmit} as="form">
              <RadioButtonGroup mb={3} defaultValue="all" onChange={this.handleSearchInput} value={specialty} name="specialty" isInline>
              <FormLabel><Text fontSize="lg" color="gray.500">Search by Specialty</Text></FormLabel>
              {this.state.specialtyForm.map(el => {
                return (
                  <CustomRadio size="sm" value={el} key={el}>{el}</CustomRadio>
                )
              })}
               </RadioButtonGroup>
               <Button size="sm" m={2} onClick={this.backSearch} type="submit">Show All</Button>
               <Button size="sm" m={2} variantColor='blue' type="submit">Search</Button>
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
              <VetCard p={5} key={el._id} address={el.address} name={el.name}
              image={el.image} specialty={el.studies.specialty}
              animal={el.studies.animal} id={el._id} />)
            })}
            </Stack>
            </Stack>
        )
    }
}
