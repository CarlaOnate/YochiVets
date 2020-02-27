import React, { Component, createContext } from 'react'
import { withRouter } from 'react-router-dom'
import {signup} from './services'

export const MyContext = createContext()

class MyProvider extends Component{
    state={
      signupForm: {
        name: '',
        role: '',
        email: '',
        phone: Number,
        address: {
          street: '',
          neighborhood: '',
          code: Number
        },
        studies: {},
        availableHours:[],
        about: ''
      },
      signupSubmit: {},
      loginSubmit: {},
      loginForm: {},
      user: {}
    }

    handleSignupInput = async (e, type) => {
      const {name, value} = e.target
      this.setState({role: type})
      this.setState(prevState => ({
        ...prevState,
        signupForm: {
          ...prevState.signupForm,
          [name]: value
        }
      }
      ))
    }

    handleAddress = (e) => {
      const {name, value} = e.target
      this.setState(prevState => ({
        ...prevState,
        signupForm: {
          ...prevState.signupForm,
          address: {
            ...prevState.signupForm.address,
            [name]: value
          }
        }
      }
      ))
    }

    signupSubmit = async(e) => {
      e.preventDefault()
      const {data} = await signup(this.state.signupForm)
      console.log('Entrando en peticion submit', data)
      this.props.history.push('/findVets')
    }

    render(){
      const {handleSignupInput, handleAddress, state, signupSubmit} = this
        return(
          <MyContext.Provider
          value={{
            handleSignupInput,
            handleAddress,
            signupSubmit,
            state
          }}

          >
            {this.props.children}
          </MyContext.Provider>
        )
    }
}

export default withRouter(MyProvider)
