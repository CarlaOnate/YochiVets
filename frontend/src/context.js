import React, { Component, createContext } from 'react'
import { withRouter } from 'react-router-dom'

export const MyContext = createContext()

class MyProvider extends Component{
    state={

    }

    render(){
        return(
          <MyContext.Provider>
            {this.props.children}
          </MyContext.Provider>
        )
    }
}

export default withRouter(MyProvider)
