import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import configureStore from './store/configureStore'
import { fetchImages } from './actions/images'
import './img/logo.png'

const store = configureStore()
store.dispatch(fetchImages())

render(
  <Root store={store} />,
  document.getElementById('root')
)
