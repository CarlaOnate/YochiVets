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
    Spinner,
    InputRightAddon
  } from '@chakra-ui/core'
  import { getAllVetsAPI, getBySpecialty} from '../services'

export default class FindVets extends Component {
    state = {
      vets: [],
      spinner: true,
      searchInput: {
        bar: '',
        specialty: ''
      }
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

    searchBarSubmit = async () => {

    }

    searchCheckboxSubmit = async (e) => {
      e.preventDefault()
      let {data} = await getBySpecialty(this.state.searchInput.specialty)
      this.setState({vets: data.vets})
    }

    render() {
      let { vets, spinner, searchInput: {bar, specialty} } = this.state
        return (
            <div>
            <Heading>Find Vets</Heading>
            <Box as="form">
            <FormLabel>Search</FormLabel>
              <InputGroup>
                <InputLeftAddon><Icon name="search"/></InputLeftAddon>
                <Input onChange={this.handleSearchInput} value={bar} name="bar" type="text" placeholder="Search" />
                <InputRightAddon children={(<Button type="submit">Search</Button>)}/>
              </InputGroup>
              </Box>
              <Stack m={4} direction="row" justify="space-around">
              <Box onSubmit={this.searchCheckboxSubmit} as="form">
              <FormLabel>Search by specialty</FormLabel>
              <RadioGroup onChange={this.handleSearchInput} value={specialty} name="specialty" key="0" isInline>
                    <Radio  key="1" value="General Medicine">General Medicine</Radio>
                    <Radio  key="2"  value="Behaviour">Behaviour</Radio>
                    <Radio  key="3"  value="Cardiology">Cardiology</Radio>
                    <Radio  key="4"  value="Neurology">Neurology</Radio>
                    <Radio  key="5"  value="Oncology">Oncology</Radio>
                    <Radio  key="6"  value="Nutrition">Nutrition</Radio>
               </RadioGroup>
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
            />) : vets.map(el => {
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
