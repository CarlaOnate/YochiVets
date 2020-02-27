import React, { Component, createContext } from 'react'
import { withRouter } from 'react-router-dom'

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
      console.log(this.state.signupForm)
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

    signupSubmit = async() => {
      
    }

    render(){
      const {handleSignupInput, handleAddress, state} = this
        return(
          <MyContext.Provider
          value={{
            handleSignupInput,
            handleAddress,
            state
          }}

          >
            {this.props.children}
          </MyContext.Provider>
        )
    }
}

export default withRouter(MyProvider)
