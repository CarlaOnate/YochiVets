import React from 'react';
import ReactDOM from 'react-dom';
import MyProvider from './context'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'


import './index.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';

function WithContext() {
    return (
      <BrowserRouter>
        <MyProvider>
          <ThemeProvider>
            <CSSReset/>
            <Router />
          </ThemeProvider>
        </MyProvider>
      </BrowserRouter>
    )
  }

ReactDOM.render(<WithContext />, document.getElementById('root'));

serviceWorker.unregister();
