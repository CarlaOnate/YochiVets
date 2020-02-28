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
        }
      },
      signupVet: {
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
      counter: 0
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

    handleSignupVet = (e) => {
      const {name, value} = e.target
      this.setState(prevState => ({
        ...prevState,
        role: 'VET',
        signupVet: {
          ...prevState.signupVet,
          [name]: value
        }
      }))
    }

    handleCounter = (e, type) => {
      type === 'add' ? this.setState({counter: this.state.counter+1}) : this.setState({counter: this.state.counter-1})
    }


    signupSubmit = async(e) => {
      e.preventDefault()
      const {data} = await signup(this.state.signupForm)
      this.setState({showNav: true, user: data})
      this.props.history.push('/findVets')
    }

    loginSubmit = async(e) => {
      e.preventDefault()
      const {data} = await login(this.state.loginForm)
      this.props.history.push('/findVets')
      this.setState({showNav: true, user: data})
    }

    signupVetSubmit = async (e) => {
      e.preventDefault()
      const {data} = await signup(this.state.signupVet)
      this.props.history.push('/profile')
      this.setState({showNav: true, user: data})
    }

    logoutSubmit = async (e) => {
      await logout()
      this.setState({showNav: false})
      this.props.history.push('/')
    }

    render(){
      const {handleSignupInput, handleAddress, state, signupSubmit, logoutSubmit, loginSubmit, 
        handleLogin, handleSignupVet, handleCounter, signupVetSubmit} = this
        return(
          <MyContext.Provider
          value={{
            handleSignupInput,
            handleAddress,
            signupSubmit,
            logoutSubmit,
            loginSubmit,
            handleLogin,
            handleSignupVet,
            handleCounter,
            signupVetSubmit,
            state
          }}

          >
            {this.props.children}
          </MyContext.Provider>
        )
    }
}

export default withRouter(MyProvider)
