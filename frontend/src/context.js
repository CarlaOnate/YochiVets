import React, { Component, createContext } from 'react'
import { withRouter } from 'react-router-dom'
import {signup, logout} from './services'

export const MyContext = createContext()

class MyProvider extends Component{
    state={
      signupForm: {
        name: '',
        role: '',
        email: '',
        password: '',
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
      user: {},
      showNav: false,
      loginForm: {},
    }

    handleSignupInput = async (e, type) => {
      const {name, value} = e.target
      this.setState(prevState => ({
        ...prevState,
        signupForm: {
          ...prevState.signupForm,
          [name]: value,
          role: type
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
      this.setState({showNav: true, user: data})
      this.props.history.push('/findVets')
    }

    logoutSubmit = async (e) => {
      await logout()
      this.setState({showNav: false})
      this.props.history.push('/')
    }

    render(){
      const {handleSignupInput, handleAddress, state, signupSubmit, logoutSubmit} = this
        return(
          <MyContext.Provider
          value={{
            handleSignupInput,
            handleAddress,
            signupSubmit,
            logoutSubmit,
            state
          }}

          >
            {this.props.children}
          </MyContext.Provider>
        )
    }
}

export default withRouter(MyProvider)
