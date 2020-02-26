import React from 'react';
import ReactDOM from 'react-dom';
import MyProvider from './context'
import { BrowserRouter } from 'react-router-dom'


import './index.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';

function WithContext() {
    return (
      <BrowserRouter>
        <MyProvider>
          <Router />
        </MyProvider>
      </BrowserRouter>
    )
  }

ReactDOM.render(<WithContext />, document.getElementById('root'));

serviceWorker.unregister();
