import React, { Component, createContext } from 'react'
import { withRouter } from 'react-router-dom'
import {signup, logout, login} from './services'

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
      loginForm: {
        email: '',
        password: ''
      },
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

    handleLogin = (e) => {
      const {name, value} = e.target
      this.setState(prevState => ({
        ...prevState,
        loginForm: {
          ...prevState.loginForm,
          [name]: value
        }
      }))
    }

    signupSubmit = async(e) => {
      e.preventDefault()
      const {data} = await signup(this.state.signupForm)
      this.setState({showNav: true, user: data})
      this.props.history.push('/findVets')
    }

    loginSubmit = async(e) => {
      console.log('loginSubmit')
      e.preventDefault()
      const {data} = await login(this.state.loginForm)
      this.props.history.push('/findVets')
      this.setState({showNav: true, user: data})
    }

    logoutSubmit = async (e) => {
      await logout()
      this.setState({showNav: false})
      this.props.history.push('/')
    }

    render(){
      const {handleSignupInput, handleAddress, state, signupSubmit, logoutSubmit, handleLogin, loginSubmit} = this
        return(
          <MyContext.Provider
          value={{
            handleSignupInput,
            handleAddress,
            signupSubmit,
            logoutSubmit,
            loginSubmit,
            handleLogin,
            state
          }}

          >
            {this.props.children}
          </MyContext.Provider>
        )
    }
}

export default withRouter(MyProvider)
