
import React from "react"
import { render } from "react-dom"

import {Provider} from "react-redux"

import { createStore, compose } from 'redux'

import reducers from './reducers'

import App from "./components/App"


let store = createStore(reducers, compose(
  window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

  
  document.addEventListener( 'DOMContentLoaded', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
      ,document.getElementById('app')
    );
  });